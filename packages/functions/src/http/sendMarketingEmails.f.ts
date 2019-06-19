import * as functions from "firebase-functions";

import Targets from '../models/Targets';
import Emails from '../models/Cohorts';
import eachOf from 'async/eachOf';

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

    if (!targetId || !cohortId) {
      res.json({ error: 'required field missing' })
    }

    const next = (targets) => {
      eachOf(targets, (target, cb) => {
        let recipient = "hello@dinify.app";
        if (config.env === "production") {
          // dangerous line
          recipient = JSON.parse(target.data).email_address;
        }

        Emails.findOne({
          where: {
            target_id: target.id
          },
          order: [['createdAt','DESC']]
        }).then((email: any) => {
          if (!email) {
            res.json({ error: 404, message: `Email not found with target id: ${target.id}` });
          }
          const message = JSON.parse(email.message);
          mail.send(message).then(([response, body]) => {
            email.message_id = response.headers['X-Message-ID'];
            email.save();
          })
        })
      })
    }

    if (targetId) {
      Targets.findOne({
        where: {
          id: targetId
        }
      }).then((o) => {
        next([o]);
      })
    }
    else if (cohortId) {
      Targets.findAll({
        where: {
          cohort_id: cohortId
        }
      })
    }

    res.sendStatus(200);
  });
});
