import * as path from "path";
import { readFileSync } from "fs";
import locales from '../templates/locales';

const sendgrid = require("@sendgrid/mail");
const mjml2html = require("mjml");

export function send(msg){
  return sendgrid.send(msg);
}

/**
msg - the message object for sendgrid
substitutions - the custom variables in the template
templateName - name of template relative to templates folder root
language - language code for localization (defaults to english)
*/
export function generate(msg, substitutions, template, language = 'en') {
  const variables = {
      ...locales[language][template.key],
      ...substitutions,
      ...msg
  };

  console.log('using variables for mail generate', variables, locales);

  // Use ES6 template literals
  const substitute = (string, vars) => new Function("return `" + string.split("${").join("${this.") + "`;").call(vars);
  const substituteDepth = (string, vars, depth = 5) => {
    let iters = 0;
    let subs = string;
    while (iters < depth && subs.includes('${')) {
      subs = substitute(subs, vars);
      iters++;
    }
    return subs;
  }

  const templatePath = path.resolve("src/templates", `${template.name}.mjml`);
  const templateString = readFileSync(templatePath).toString();
  let  substituted = templateString;
  try {
    substituted = substituteDepth(substituted, variables);
  }
  catch (e) { console.log(e) };

  const html = mjml2html(substituted, {
      filePath: templatePath,
      minify: true,
      keepComments: false,
      fonts: {
        'Lato': 'https://static.dinify.app/fonts/Lato/css',
        'Google Sans': 'https://fonts.googleapis.com/css?family=Google%20Sans:500,700'
      }
  }).html;

  try {
    substituted = substituteDepth(html, variables);
  }
  catch (e) { console.log(e) };

  return substituted;
}
