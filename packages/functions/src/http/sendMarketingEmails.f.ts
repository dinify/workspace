import * as functions from "firebase-functions";

import Targets from '../models/Targets';
import Emails from '../models/Emails';
import each from 'async/each';

import * as mail from '../util/mail';
import { readFileSync } from "fs";

const cors = require('cors')({
  origin: true,
});

const config = functions.config();

const formatPercent = (percent, decimals = 1) => `${Math.floor(percent * Math.pow(10, decimals + 2)) / Math.pow(10, decimals)}%`;

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      targetId,
      cohortId
    } = req.body;

    if (targetId ? cohortId : !cohortId) {
      res.json({ error: 'required field missing' })
    }

    const next = (targets) => {
      each(
        targets,
        (target, cb) => {
          // TODO: only send unsent emails
          // using latest for now
          Emails.findOne({
            where: {
              target_id: target.id
            },
            order: [['createdAt','DESC']]
          }).then((email: any) => {
            if (!email) {
              cb(`Email not found with target id: ${target.id}`);
              return;
            }
            if (!email.message_id) {
              const message = email.message;
              const originalRecipient = message.to.email;
              message.to.email = "test@dinify.app";
              if (config.env === "production") {
                // dangerous line
                message.to.email = originalRecipient;
              }

              mail.send(message).then(([response, body]) => {
                email.message_id = response.headers['x-message-id'];
                email
                  .save()
                  .then(() =>  cb(null))
                  .catch((e) =>  cb(e));
              })
            }
            else {
              console.log('Email already sent with message_id: ' + email.message_id)
              cb(null);
            }
          }).catch((e) => cb(e));
        }, (error) => {
          if (!error) res.json({ error: null });
          else res.json({ error });
        }
      )
    }

    if (targetId) {
      Targets.findOne({
        where: {
          id: targetId
        }
      }).then((o) => {
        if (!o) res.json({ error: 404 });
        next([o]);
      }).catch((err) => res.json({ error: err }));
    }
    else if (cohortId) {
      Targets.findAll({
        where: {
          cohort_id: cohortId
        }
      }).then((targets) => {
        if (targets.length === 0) res.json({ error: 404 });
        next(targets);
      }).catch((err) => res.json({ error: err }));
    }

  });
});
