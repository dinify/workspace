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
      data = [], // { email_address: 'email' } 'email' is key for restaurant_ta['email'] = info@restaurant.example
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



    // create TargetBatch in target_batches
    /*
      {
        filter, segment, campaign,

      }
    */
    TargetBatch.create({
      filter, segment, campaign
    }).then((r) => {

      sequelize.query("").then(([results, metadata]) => {
        // Results will be an empty array and metadata will contain the number of affected rows.
      })

      // query RestaurantTa with filter
      RestaurantsTa
      .findAll({
        where: query,
        offset: skip,
        limit,
        order
      })
      .then((results) => {
        map(
          results,
          (restaurant, cb) => {
            // for each restaurant_ta in results
            cb(null, restaurant); // use original element
            cb(null, null); // skip element
            cb(null, enhancedRestaurant); // enhance element

            // if any of targetingLabels in filter.targetingTagLabels

            TargetingTaggables.findAll({
              where: {item_id: restaurant.location_id}
            }).then((taggables) => {
              if (!taggables || taggables.length < 1) {
                cb(null, restaurant);
              } else {
                map(
                  taggables,
                  (taggable, cb2) => {
                    TargetingTags.findOne({
                      where: {id: taggable.get().targeting_tag_id}
                    }).then((targetingTag) => {
                      cb2(null, targetingTag.get().label)
                    }).catch((error) => cb2(error));
                  }, (err2, targetingLabels) => {
                    if (err2) {
                      cb(err2)
                    } else {
                      const enhancedRestaurant = restaurant.get();
                      enhancedRestaurant.targetingTags = targetingLabels;
                      cb(null, enhancedRestaurant);
                    }
                  }
                )
              }
            }).catch((error) => cb(error));
          },
          (err, enhancedResults) => {
            if (err) {
              res.json({ error: err });
            } else {
              // for each result in enhancedResults into
              enhancedResults
              .filter(e => e !== null)
              .map(result => {
                // process data for target
                let processedData = {};
                Object.entries(data).forEach(([key, value]) => {
                  processedData[key] = restaurant[value];
                });

                // create target with data
                Target.create({
                  data: processedData,
                  item_id: restaurant.location_id,
                  item_type: 'App\\Models\\RestaurantTa'
                  target_batch_id: r.id
                });
              })
            }
          }
        ) // map
      }).catch((err) => res.json({ error: err }));
    }).catch((err) => res.json({ error: err }));
  });
});
