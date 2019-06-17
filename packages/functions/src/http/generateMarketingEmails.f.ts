import * as functions from "firebase-functions";
import Restaurants from "../schema/Restaurants";
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

        Tokens.create({
          item_id: target.id,
          item_type: 'App\\Models\\Target',
          type: 'signup',
          status: 'pending',
          data: JSON.stringify({}),
          expires_at: new Date()
        }).then((token) => {
          const receipent = "hello@dinify.app";
          if (config.env === "production") {
            const receipent = JSON.parse(target.data).email;
          }

          const template = "RestaurantOnboarding";
          const msg = {
            to: {
              email: receipent
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
            link: `https://www.dinify.app?t=${token.id}&e=${receipent}`
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
      Cohorts.findAll({
        where: {
          id: cohortId
        }
      })
    }
  });
});
