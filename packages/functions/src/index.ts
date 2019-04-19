import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as glob from "glob";

// Standard commonJS imports required
require('dotenv').config();
require('./mongo.config');
const sendgrid = require("@sendgrid/mail");

admin.initializeApp(functions.config().firebase);
sendgrid.setApiKey(functions.config().sendgrid.key);

/** EXPORT ALL FUNCTIONS
 *
 *   Loads all `.function.js` files
 *   Exports a cloud function matching the file name
 *
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 */
let allFunctions = {};
const files = glob.sync('./**/*.f.js', { cwd: __dirname });

for(let f=0,fl=files.length; f<fl; f++){
  const file = files[f];
  const functionName = file.split('/').pop().slice(0, -5); // Strip off '.f.js'

  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    allFunctions[functionName] = require(file);
  }
}

module.exports = allFunctions;
