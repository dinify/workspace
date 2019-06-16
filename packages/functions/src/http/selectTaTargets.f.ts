import * as functions from "firebase-functions";
import map from 'async/map';
import RestaurantsTa from '../models/RestaurantsTa';
import TargetingTags from '../models/TargetingTags';
import TargetingTaggables from '../models/TargetingTaggables';

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      segment = 'default', // segment-1
      campaign = 'default', // rp-onboarding
      filter: {
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

    sequelize.query(`
      select *
      from ${extTable}
      where ${extKey} in (
      	select ${extKey}
      	from ${extTable} as ext
      	join targeting_taggables as ttg on ext.${extKey}=ttg.item_id
      	join targeting_tags as tta on ttg.targeting_tag_id=tta.id
      	where label in ('${filter.targetingTagLabels.join("','")}')
      )
      or ${extKey} in (
        select ${extKey}
        from ${extTable} as ext
        join targets on ext.${extKey}=targets.target_id
        join campaign_statuses as cps on targets.id=cps.target_id
        where cps.status in ('${filter.campaignStatuses.join("','")}')
      )
      or ${extKey} in (
        select ${extKey}
        from ${extTable} as ext
        join targets on ext.${extKey}=targets.target_id
        join emails on targets.id=emails.target_id
        join events_sg as sg on emails.sg_message_id=sg.sg_message_id
        where sg.event in ('${filter.emailStatuses.join("','")}')
      )
    `).then(([results, metadata]) => {
      if (!results.length) {
        return res.json({ error: 'no results for the filter specified' });
      }
      else {
        TargetBatch.create({
          filter, segment, campaign
        }).then((targetBatch) => {
          eachOf(results, (result, cb) => {
            // process data for target
            let processedData = {};
            Object.entries(data).forEach(([key, value]) => {
              processedData[key] = result[value];
            });

            // create target with data
            Target.create({
              data: JSON.stringify(processedData),
              item_id: result[extKey],
              item_type: extType,
              target_batch_id: targetBatch.id
            });
          })
        })
      }
    })
  });
});
