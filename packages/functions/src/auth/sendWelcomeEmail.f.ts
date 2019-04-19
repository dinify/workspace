import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as path from "path";
import { readFileSync } from "fs";

const mjml2html = require("mjml");
const sendgrid = require("@sendgrid/mail");

exports = module.exports = functions
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
