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
export function generate(msg, substitutions, templateName, language = 'en') {
  const variables = {
      ...locales[language].onboarding,
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

  const templatePath = path.resolve("src/templates", `${templateName}.mjml`);
  const template = readFileSync(templatePath).toString();
  let  substituted = template;
  try {
    substituted = substituteDepth(template, variables);
  }
  catch (e) { console.log(e) };

  const html = mjml2html(substituted, {
      filePath: templatePath
  }).html;

  try {
    substituted = substituteDepth(html, variables);
  }
  catch (e) { console.log(e) };

  return substituted;
}
