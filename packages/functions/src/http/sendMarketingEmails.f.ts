import * as functions from "firebase-functions";

import Targets from '../models/Targets';
import Emails from '../models/Cohorts';

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
      targetId = null,
      cohortId = null
    } = req.body;

    if (!targetId || !cohortId) {
      return res.json({ error: 'required field missing' })
    }
x
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
          orderBy: 'createdAt'
        }).then((email) => {
          const message = JSON.parse(email.message);
          mail.send(message).then(([response, body]) => {
            email.message_id = response.headers['X-Message-ID'];
            email.save();
          })
        })
      })
    }

    if (target_id) {
      Targets.findOne({
        where: {
          id: targetId
        }
      }).then((o) => {
        next([o]);
      })
    }
    else if (cohort_id) {
      Targets.findAll({
        where: {
          cohort_id: cohortId
        }
      })
    }

    res.sendStatus(200);
  });
});
