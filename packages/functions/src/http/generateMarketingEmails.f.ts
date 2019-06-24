import * as functions from "firebase-functions";

import RestaurantsTa from "../models/RestaurantsTa";
import TargetingTags from '../models/TargetingTags';
import TargetingTaggables from '../models/TargetingTaggables';
import Targets from '../models/Targets';
import Tokens from '../models/Tokens';
import Emails from '../models/Emails';
import Cohorts from '../models/Cohorts';
import uuidBase62 from 'uuid-base62';
import map from 'async/map';

import * as path from "path";
import emojis from "../data/emojis";
import likelySubtags from "../data/likelySubtags";
import localeDisplayNames from "../data/cs/localeDisplayNames";
import * as mail from '../util/mail';
import { readFileSync } from "fs";
import _ from 'lodash';


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
      return;
    }

    const capitalizeFirst = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const next = (targets) => {
      map(targets, (target, cb) => {
        // process data from external source

        // type inferred from target.item_type
        RestaurantsTa.findOne({ where: { location_id: target.item_id }}).then((restaurant: any) => {
          if (!restaurant) {
            cb('External data not found for target: ' + target.item_id);
            return;
          }

          let langDist = _.keys(restaurant.language_distribution).map(key => {
            return {
              lang: key,
              ...restaurant.language_distribution[key]
            }
          })
          .sort((a, b) => {
            return b.count - a.count;
          })
          .filter(val => ['en', 'cs'].indexOf(val.lang) === -1)
          .splice(0, 5);

          const targetPercent = 0.85;
          const maxRatio = langDist[0].countRel;
          langDist = langDist.map(val => ({
            emoji: emojis[likelySubtags[val.lang].split('-')[2]],
            language: capitalizeFirst(localeDisplayNames.languages[val.lang]),
            count: val.count,
            ratio: formatPercent(Math.max(val.countRel * (targetPercent / maxRatio), 0.1), 0),
            percent: formatPercent(val.countRel)
          }));

          const recipient = target.data.email_address;
          const tokenData = { e: recipient };
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

          Tokens.create({
            item_id: target.id,
            item_type: 'App\\Models\\Target',
            type: 'signup',
            status: 'pending',
            data: tokenData,
            expires_at: new Date()
          }).then((token: any) => {
            const variables = {
              restaurant: {
                name: restaurant.name,
              },
              stats: {
                langDist,
                targetCount: restaurant.target_languages,
                targetPercent: formatPercent(restaurant.target_languages_rel)
              },
              price: '€19.95',
              link: `https://www.dinify.app/landing?t=${token.id}&email=${recipient}`
            };
            const html = mail.generate(msg, variables, template);

            // save email object into emails table
            Emails.create({
              target_id: target.id,
              message_id: null, // null at the time of generating, defined at the time of sending
              message_key: 'events_sg.message_id',
              type: template,
              message: {...msg, html, variables}
            }).then((emailResult) => {
              cb(null, { email: emailResult.get(), token });
            }).catch((error) => cb(error));

          }).catch((error) => cb(error));
        }).catch((error) => cb(error));
      }, (error, results) => {
        if (!error) res.json({ error: null, results });
        else res.json({ error });
      });
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
