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

const formatPercent = (percent, decimals = 1) => `${Math.floor(percent * Math.pow(10, decimals + 2)) / Math.pow(10, decimals)}%`;

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      targetId = null,
      targetBatchId = null
    } = req.body;

    if (!target_id || !target_batch_id) {
      return res.json({ error: 'required field missing' })
    }

    const next = (targets) => {
      eachOf(targets, (process, cb) => {
        // process data from external source
        let langDist = Object.keys(process.langDist).map(key => {
          return {
            lang: key,
            ...process.langDist[key]
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

        Token.create({}).then();

        const msg = {
          to: {
            email: "hello@dinify.app" // process.email
          },
          from: {
            email: "hello@dinify.app",
            name: "Dinify"
          },
          subject: "Lepší recenze, vyšší zisk, zkuste Dinify"
        };
        const variables = {
          restaurant: {
            name: process.name,
          },
          stats: {
            langDist,
            targetCount: process.targetLang,
            targetPercent: formatPercent(process.targetLangRel)
          },
          price: '€19.95',
          link: 'https://dashboard.dinify.app'
        };
        const html = mail.generate(msg, variables, "RestaurantOnboarding");

        // save email object into emails table
        Email.create({
          target_id: ,
          sg_message_id: null, // null at the time of generating, defined at the time of sending
        }).then((o) => {

        })


        return res.send(html);

        /* return sendgrid.send({
            html: substituted,
            ...msg
        }); */
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
    else if (target_batch_id) {
      Targets.findAll({
        where: {
          target_batch_id: targetBatchId
        }
      })
    }

    RestaurantsTa.find(query).exec((e, result) => {
      if (!e) {


      } else {
        return res.json({ error: e });
      }
    });
  });
});
