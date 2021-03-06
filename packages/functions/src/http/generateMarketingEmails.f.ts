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
import locales from '../templates/locales';
import * as path from "path";
import emojis from "../data/emojis";
import likelySubtags from "../data/likelySubtags";
import localeDisplayNames from "../data/cs/localeDisplayNames";
import * as mail from '../util/mail';
import { readFileSync } from "fs";
import _ from 'lodash';
import { getLanguageAlias } from '../util/cldr';


const cors = require('cors')({
  origin: true,
});

const config = functions.config();

const formatPercent = (percent, decimals = 1) => `${Math.floor(percent * Math.pow(10, decimals + 2)) / Math.pow(10, decimals)}%`;

const excludeLanguagesFromStats = ['en', 'cs'];
const defaultLanguage = 'cs';
const defaultSender = {
  email: "hello@dinify.app",
  name: "Dinify"
};

const handleError = (cb, errorId: string) => (error: any) => {
  console.error(error);
  console.error(errorId);
  cb({ error, errorId });
}

function isString(s) {
  return typeof(s) === 'string' || s instanceof String;
}

const capitalizeFirst = (string, context) => {
  if (!string || !(isString(string))) {
    console.error(context);
  };
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

    const next = (targets) => {
      map(targets, (target, cb) => {
        // process data from external source

        // type inferred from target.item_type
        RestaurantsTa.findOne({ where: { location_id: target.item_id }}).then((restaurant: any) => {
          if (!restaurant) {
            cb('External data not found for target: ' + target.item_id);
            return;
          }


          let targetCount = 0;
          let totalCount = 0;
          let langDist = Object.keys(restaurant.language_distribution).map(key => {
            const current = restaurant.language_distribution[key];
            if (excludeLanguagesFromStats.indexOf(key) === -1) {
              targetCount += current.count;
            }
            totalCount += current.count;
            return {
              lang: key,
              ...current
            }
          })
          .sort((a, b) => {
            return b.count - a.count;
          })
          .filter(val => excludeLanguagesFromStats.indexOf(val.lang) === -1)
          .splice(0, 5);

          const targetRel = targetCount / totalCount;

          const targetPercent = 0.85;
          const maxRatio = langDist[0].countRel;
          langDist = langDist.map(val => {
            let languageName = localeDisplayNames.languages[val.lang];
            if (!languageName) {
              console.log('replacing lang', val.lang);
              const properLang = getLanguageAlias(val.lang);
              console.log('with', properLang);
              languageName = localeDisplayNames.languages[properLang];
              console.log(languageName);
            }
            return {
              emoji: emojis[likelySubtags[val.lang].split('-')[2]],
              language: capitalizeFirst(languageName, val),
              count: val.count,
              ratio: formatPercent(Math.max(val.countRel * (targetPercent / maxRatio), 0.1), 0),
              percent: formatPercent(val.countRel)
            }
          });

          const recipient = target.data.email_address;
          const tokenData = { e: recipient };
          const template = {
            name: "RestaurantOnboarding",
            key: "rp-onboarding"
          };
          let language = defaultLanguage;

          // TODO: move to it's own function
          // try {
          //   // detect language for target based on TA email data
          //   recipient.split('@')[1].split('.').map(part => {
          //     if (part === 'cz') language = 'cs';
          //   })
          // }
          // catch (e) {}

          Tokens.create({
            item_id: target.id,
            item_type: 'App\\Models\\Target',
            type: 'signup',
            status: 'pending',
            data: tokenData,
            expires_at: new Date()
          }).then((token: any) => {
            const msg = {
              to: {
                email: recipient
              },
              from: defaultSender,
              subject: locales[language][template.key].subject
            };
            const variables = {
              restaurant: {
                name: restaurant.name,
              },
              stats: {
                langDist,
                targetCount,
                targetPercent: formatPercent(targetRel)
              },
              price: '490 K??',
              link: `https://www.dinify.app/restaurants?t=${token.id}&email=${recipient}`
            };

            const html = mail.generate(msg, variables, template, language);

            // save email object into emails table
            Emails.create({
              target_id: target.id,
              message_id: null, // null at the time of generating, defined at the time of sending
              message_key: 'events_sg.message_id',
              type: template.key,
              message: {...msg, html, variables}
            }).then((emailResult) => {

              cb(null, { email: emailResult.get(), token });

            }).catch(handleError(cb, 'Emails.create'));

          }).catch(handleError(cb, 'Tokens.create'));

        }).catch(handleError(cb, 'RestaurantsTa.findOne'));

      }, (error, results) => {
        if (!error) res.json({ results });
        else res.json({ error });
      });
    }

    if (targetId) {
      Targets.findOne({
        where: {
          id: targetId
        }
      }).then((o) => {
        if (!o) {
          res.json({ error: 404 });
        } else {
          next([o]);
        }
      }).catch((err) => res.json({ error: err }));
    }
    else if (cohortId) {
      Targets.findAll({
        where: {
          cohort_id: cohortId
        }
      }).then((targets) => {
        if (targets.length === 0) {
          res.json({ error: 404 });
        } else {
          next(targets);
        }
      }).catch((err) => res.json({ error: err }));
    }
  });
});
