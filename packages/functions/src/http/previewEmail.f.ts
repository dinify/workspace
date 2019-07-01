import * as functions from "firebase-functions";
import * as mail from '../util/mail';

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      message,
      variables,
      template,
      language = 'en'
    } = req.body;

    if (!message || !variables || !template) {
      res.json({ error: 'required field missing: message, variables, template' })
    }

    const html = mail.generate(message, variables, template, language);
    res.send(html);

  });
});
