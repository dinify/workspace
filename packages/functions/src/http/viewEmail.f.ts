import * as functions from "firebase-functions";
import Emails from '../models/Emails';

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      emailId
    } = req.body;

    if (!emailId) {
      res.json({ error: 'required field missing: emailId' })
    }
    else Emails.findOne({ where: { id: emailId }}).then((email: any) => {
      if (!email) res.json({ error: 404 });
      else res.send(email.message.html);
    });
  });
});
