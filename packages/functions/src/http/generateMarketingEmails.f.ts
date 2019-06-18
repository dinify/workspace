import * as functions from "firebase-functions";

import RestaurantsTa from "../models/RestaurantsTa";
import TargetingTags from '../models/TargetingTags';
import TargetingTaggables from '../models/TargetingTaggables';
import Targets from '../models/Targets';
import Cohorts from '../models/Cohorts';
import uuidBase62 from 'uuid-base62';

import * as path from "path";
import emojis from "../data/emojis";
import likelySubtags from "../data/likelySubtags";
import localeDisplayNames from "../data/cs/localeDisplayNames";
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

    const next = (targets) => {
      eachOf(targets, (target, cb) => {
        // process data from external source
        let extData = RestaurantsTa.findOne()
        let langDist = Object.keys(target.langDist).map(key => {
          return {
            lang: key,
            ...target.langDist[key]
          }
        })
        .sort((a, b) => {
          return b.count - a.count;
        })
        .filter(val => ['en', 'cs'].indexOf(val.lang) === -1)
        .splice(0, 5);
        const target = 0.85;
        const maxRatio = langDist[0].countRel;
        langDist = langDist.map(val => ({
          emoji: emojis[likelySubtags[val.lang].split('-')[2]],
          language: localeDisplayNames.languages[val.lang],
          count: val.count,
          ratio: formatPercent(Math.max(val.countRel * (target / maxRatio), 0.1), 0),
          percent: formatPercent(val.countRel)
        }));

        const recipient = "hello@dinify.app";
        if (config.env === "production") {
          const recipient = JSON.parse(target.data).email;
        }

        const dataStr = JSON.stringify({
          e: recipient
        });
        const dataEnc = uuidBase62.encode(dataStr);

        Tokens.create({
          item_id: target.id,
          item_type: 'App\\Models\\Target',
          type: 'signup',
          status: 'pending',
          data: dataStr,
          expires_at: new Date()
        }).then((token) => {


          const template = "RestaurantOnboarding";
          const msg = {
            to: {
              email: recipient
            },
            from: {
              email: "hello@dinify.app",
              name: "Dinify"
            },
            subject: "Lepší recenze, vyšší zisk, zkuste Dinify"
          };
          const variables = {
            restaurant: {
              name: target.name,
            },
            stats: {
              langDist,
              targetCount: target.targetLang,
              targetPercent: formatPercent(target.targetLangRel)
            },
            price: '€19.95',
            link: `https://www.dinify.app/landing?d=${dataEnc}`
          };
          const html = mail.generate(msg, variables, template);

          // save email object into emails table
          Emails.create({
            target_id: target.id,
            message_id: null, // null at the time of generating, defined at the time of sending
            message_key: 'sg_message_id',
            type: template,
            message: JSON.stringify({...msg, html, variables})
          }).then((o) => {
            res.json({ ...o, token });
          })
        });
      }
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
  });
});
