import * as functions from "firebase-functions";
import Restaurants from "../models/Restaurants";
import * as path from "path";
import emojis from "../data/emojis";
import likelySubtags from "../data/likelySubtags";
import localeDisplayNames from "../data/localeDisplayNames";
import * as mail from '../util/mail';
import { readFileSync } from "fs";

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      query = {},
      skip = 0,
      limit = 100,
      sort = {}
    } = req.body;
    Restaurants.find(query).sort(sort).skip(skip).limit(limit).exec((e, result) => {
      if (!e) {
        const process = result[req.query.offset];
        const formatPercent = (percent, decimals = 1) => `${Math.floor(percent * Math.pow(10, decimals + 2)) / Math.pow(10, decimals)}%`;
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

        const msg = {
            to: {
                email: "hello@dinify.app" // process.email
            },
            from: {
                email: "hello@dinify.app",
                name: "Dinify"
            },
            subject: "Get started with Dinify"
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
            link: 'https://dashboard.dinify.app'
        };
        const html = mail.generate(msg, variables, "RestaurantOnboarding");

        return res.send(html);

        /* return sendgrid.send({
            html: substituted,
            ...msg
        }); */

      } else {
        return res.json({ error: e });
      }
    });
  });
});
