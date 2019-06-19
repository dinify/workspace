import * as functions from "firebase-functions";
import map from 'async/map';
import RestaurantsTa from "../models/RestaurantsTa";
import TargetingTaggables from '../models/TargetingTaggables';
import TargetingTags from '../models/TargetingTags';

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      query = {},
      skip = 0,
      limit = 100,
      order = [] // [['id','ASC']]
    } = req.body;
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
                  }).then((targetingTag: any) => {
                    if (targetingTag) {
                      cb2(null, targetingTag.get().label)
                    }
                    else cb(null, restaurant);
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
            res.json({ error: null, result: enhancedResults })
          }
        }
      )
    })
    .catch((error) => res.json({ error }));
  });
});
