"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const path = require("path");
const fs_1 = require("fs");
const api_1 = require("./api");
// Standard commonJS imports required
const mjml2html = require("mjml");
const sendgrid = require("@sendgrid/mail");
admin.initializeApp(functions.config().firebase);
sendgrid.setApiKey(functions.config().sendgrid.key);
const app = api_1.default(admin);
const db = admin.firestore();
/**
* API cloud function
* Note: the name of this variable determines the route of the function
* In this case: /api
*/
exports.api = functions.https.onRequest((req, res) => {
    // https://tabb-global.cloudfunctions.net/api
    // without trailing "/" will have req.path = null, req.url = null
    // which won"t match to your app.get("/", ...) route
    if (!req.path) {
        // prepending "/" keeps query params, path params intact
        req.url = `/${req.url}`;
    }
    if (req.path.startsWith("/api"))
        req.url = req.url.slice(4);
    return app(req, res);
});
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => __awaiter(this, void 0, void 0, function* () {
    // TODO: post message to slack webhook
    console.log("New user joined", user);
    const link = yield admin.auth().generateEmailVerificationLink(user.email, {
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
    const variables = Object.assign({ user, verification_link: link }, msg);
    const templatePath = path.resolve("templates", "Verification.mjml");
    const template = fs_1.readFileSync(templatePath).toString();
    const html = mjml2html(template, {
        filePath: templatePath
    }).html;
    // Use ES6 template literals
    const substituted = new Function("return `" + html.split("${").join("${this.") + "`;").call(variables);
    return sendgrid.send(Object.assign({ html: substituted }, msg));
}));
//# sourceMappingURL=index.js.map