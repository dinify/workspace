import * as functions from "firebase-functions";
import Emails from "../models/Emails";
import EventsSg from "../models/EventsSg";

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const events = req.body || [];

    events.map((eventObject) => {
      const { email, event, timestamp, sg_message_id } = eventObject;

      Emails.findOne({
        where: {
          sg_message_id
        }
      }).then((emailResult: any) => {
        if (emailResult) {
          EventsSg.create({
            email_id: emailResult.id,
            ...eventObject
          }).then((o) => {
            res.sendStatus(200);
          }).catch((error) => res.json({ error }));
        }

      }).catch((error) => res.json({ error }));
    })
  });
});
