import * as functions from "firebase-functions";
import Emails from "../models/Emails";
import EventsSg from "../models/EventsSg";
import each from 'async/each';

const cors = require('cors')({
  origin: true,
});

const handleError = (errorMessage, cb, error?) => {
  console.error(errorMessage);
  if (error) console.error(error);
  cb(errorMessage);
}

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const events = req.body || [];

    console.log(events);

    each(
      events,
      (eventObject: any, cb) => {
        const { sg_message_id } = eventObject;
        if (!sg_message_id) {
          cb('no sg_message_id');
          return;
        }
        const messageId = sg_message_id.split('.')[0];
        Emails.findOne({
          where: {
            message_id: messageId,
            message_key: 'events_sg.message_id'
          }
        }).then((emailResult: any) => {
          if (emailResult) {
            EventsSg.create({
              email_id: emailResult.id,
              email: eventObject.email,
              timestamp: eventObject.timestamp,
              smtp_id: eventObject['smtp-id'],
              event: eventObject.event,
              category: eventObject.category,
              sg_event_id: eventObject.sg_event_id,
              sg_message_id: eventObject.sg_message_id,
              message_id: messageId
            }).then(() => {
              cb(null);
            }).catch((error) =>
              handleError('EventsSg creation error', cb, error)
            );
          } else {
            handleError('no email found for this event', cb);
          }
        }).catch((error) =>
          handleError('no email found for provided sg_message_id', cb, error)
        );
      }, (error) => {
        if (!error) {
          res.json({ error: null});
        } else {
          res.json({ error });
        }
      }
    )
  });
});
