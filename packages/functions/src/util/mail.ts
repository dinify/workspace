import * as path from "path";
import { readFileSync } from "fs";

const sendgrid = require("@sendgrid/mail");
const mjml2html = require("mjml");

export function send(msg){
  return sendgrid.send(msg);
}

export function generate(msg, substitutions, templateName) {
  // Use ES6 template literals
  const substitute = (string, variables) => new Function("return `" + string.split("${").join("${this.") + "`;").call(variables);

  const variables = {
      ...substitutions,
      ...msg
  };

  const templatePath = path.resolve("src/templates", `${templateName}.mjml`);
  const template = readFileSync(templatePath).toString();

  let substituted = substitute(template, variables);

  const html = mjml2html(substituted, {
      filePath: templatePath
  }).html;

  substituted = substitute(html, variables);
  return substituted;
}
