import * as path from "path";
import { readFileSync } from "fs";

const sendgrid = require("@sendgrid/mail");
const mjml2html = require("mjml");

export function send(msg){
  return sendgrid.send(msg);
}

export function generate(msg, substitutions, templateName) {
  const variables = {
      ...substitutions,
      ...msg
  };

  // Use ES6 template literals
  const substitute = (string) => new Function("return `" + string.split("${").join("${this.") + "`;").call(variables);

  const templatePath = path.resolve("src/templates", `${templateName}.mjml`);
  const template = readFileSync(templatePath).toString();

  let substituted = substitute(template);

  const html = mjml2html(substituted, {
      filePath: templatePath
  }).html;

  substituted = substitute(html);
  return substituted;
}
