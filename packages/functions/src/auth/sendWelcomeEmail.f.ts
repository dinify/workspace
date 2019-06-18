import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as path from "path";
import { readFileSync } from "fs";
import * as mail from '../util/mail';

const mjml2html = require("mjml");

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
        verification_link: link
    };

    const html = mail.generate(msg, variables, "Verification");
    return mail.send({
      html,
      ...msg
    });
});
