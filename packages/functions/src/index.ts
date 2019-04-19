import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as path from "path";
import { readFileSync } from "fs";
import createApp from "./api";

// Standard commonJS imports required
const mjml2html = require("mjml");
const sendgrid = require("@sendgrid/mail");

admin.initializeApp(functions.config().firebase);
sendgrid.setApiKey(functions.config().sendgrid.key);

const app = createApp(admin);
const db = admin.firestore();

/**
* API cloud function
* Note: the name of this variable determines the route of the function
* In this case: /api
*/
export const api = functions
.region('europe-west1')
.https.onRequest((req, res) => {
    // https://europe-west1-dinify.cloudfunctions.net/api
    // without trailing "/" will have req.path = null, req.url = null
    // which won"t match to your app.get("/", ...) route

    if (!req.path) {
        // prepending "/" keeps query params, path params intact
        req.url = `/${req.url}`
    }
    if (req.path.startsWith("/api")) req.url = req.url.slice(4)
    return app(req, res)
});

export const sendWelcomeEmail = functions
.region('europe-west1')
.auth.user().onCreate(async (user) => {

    // TODO: post message to slack webhook
    console.log("New user joined", user);

    const link = await admin.auth().generateEmailVerificationLink(user.email || "", {
        url: `https://www.dinify.app/verified?email=${user.email}`
    });

    const msg = {
        to: {
            email: user.email,
            name: user.displayName
        },
        from: {
            email: "hello@dinify.app",
            name: "Dinify"
        },
        subject: "Verify your email"
    };
    const variables = {
        user,
        verification_link: link,
        ...msg
    };

    const templatePath = path.resolve("templates", "Verification.mjml");
    const template = readFileSync(templatePath).toString();

    const html = mjml2html(template, {
        filePath: templatePath
    }).html;

    // Use ES6 template literals
    const substituted = new Function("return `" + html.split("${").join("${this.") + "`;").call(variables);

    return sendgrid.send({
        html: substituted,
        ...msg
    });
});

export const assignRole = functions
.region('europe-west1')
.https.onRequest((req, res) => {
    if (req.body.roles !== null && req.body.roles !== undefined && req.body.user_id) {
        return admin.auth().setCustomUserClaims(req.body.user_id, {
            roles: req.body.roles
        })
        .then((response) => {
          return res.status(200).send(response);
        })
        .catch((err) => {
          return res.status(400).send({
              code: "assign-error",
              message: "Role assignment failed",
              error: err
          });
        });
    }
    return res.status(400).send({
        code: "required-missing",
        message: "Required request body parameters: roles"
    });
});
