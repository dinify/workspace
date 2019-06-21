import * as functions from "firebase-functions";
import sequelize from '../mysql.config';
import map from 'async/map';
import RestaurantsTa from '../models/RestaurantsTa';
import TargetingTags from '../models/TargetingTags';
import TargetingTaggables from '../models/TargetingTaggables';
import Cohorts from '../models/Cohorts';
import Targets from '../models/Targets';
import each from 'async/each';
import _ from 'lodash';

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      label = 'default', // segment-1
      campaign = 'default', // rp-onboarding
      filter = {
        campaignStatuses: [], // ['landed:landing', 'authorized'] campaign_statuses
        emailStatuses: [], // ['dispatched', 'clicked'] events_sg
        targetingTagLabels: [] // ['seelction-1'] targeting_taggables, targeting_tags
      }
    } = req.body;

    if (!filter) {
      res.json({ error: 'required filter field missing' })
    }

    const extTable = 'restaurants_ta';
    const extPersistData = { email_address: 'email' }; // 'email' is key for restaurant_ta['email'] = info@restaurant.example
    const extKey = 'location_id';
    const extType = 'App\\Models\\RestaurantTa';

    const filterTargetingTagLabels = filter.targetingTagLabels || [];
    const filterCampaignStatuses = filter.campaignStatuses || [];
    const filterEmailStatuses = filter.emailStatuses || [];

    const sqlQueries: string[] = [];
    if (filterTargetingTagLabels.length > 0) sqlQueries.push(`${extKey} in (
      select ${extKey}
      from ${extTable} as ext
      join targeting_taggables as ttg on ext.${extKey}=ttg.item_id
      join targeting_tags as tta on ttg.targeting_tag_id=tta.id
      where label in ('${filterTargetingTagLabels.join("','")}')
    )`);
    if (filterCampaignStatuses.length > 0) sqlQueries.push(`${extKey} in (
      select ${extKey}
      from ${extTable} as ext
      join targets on ext.${extKey}=targets.item_id
      join campaign_statuses as cps on targets.id=cps.target_id
      where cps.status in ('${filterCampaignStatuses.join("','")}')
    )`);
    if (filterEmailStatuses.length > 0) sqlQueries.push(`${extKey} in (
      select ${extKey}
      from ${extTable} as ext
      join targets on ext.${extKey}=targets.item_id
      join emails on targets.id=emails.target_id
      join events_sg as sg on emails.message_id=sg.sg_message_id
      where sg.event in ('${filterEmailStatuses.join("','")}')
      and emails.message_key="sg_message_id"
    )`);

    sequelize.query(`
      select *
      from ${extTable}
      where ${sqlQueries.join(' or ')}
    `, {
      model: RestaurantsTa,
      mapToModel: true // pass true here if you have any mapped fields
    }).then((results: any[]) => {
      console.log(results);
      if (!results.length) {
        res.json({ error: 'no results for the filter specified' });
      }
      else {
        Cohorts.create({
          filter, label, campaign
        }).then((cohort: any) => {
          each(results, (result, cb) => {
            // process data for target
            let processedData = {};
            _.values(extPersistData).forEach(([key, value]) => {
              processedData[key] = result[value];
            });
            // create target with data
            Targets.create({
              data: processedData,
              item_id: result[extKey],
              item_type: extType,
              cohort_id: cohort.id
            }).then(() => {
              cb(null);
            }).catch((err) => cb(err));

          }, (error) => {
            if (error) {
              res.json({ error });
            } else {
              res.json({ error: null });
            }
          });


        }).catch((err) => res.json({ error: err }));
      }
    }).catch((err) => res.json({ error: err }));
  });
});
