import * as functions from "firebase-functions";
import map from 'async/map';
import { Op } from "sequelize";
import RestaurantsTa from "../models/RestaurantsTa";
import TargetingTaggables from '../models/TargetingTaggables';
import TargetingTags from '../models/TargetingTags';

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    let {
      query = {},
      skip = 0,
      limit = 100,
      order = [] // [['id','ASC']]
    } = req.body;

    if (query.num_reviews) {
      query.num_reviews = {
        [Op.gte]: query.num_reviews.$gt
      }
    }

    const queryOptions = {
      where: query,
      offset: skip,
      limit,
      order
    };

    console.log(queryOptions);

    RestaurantsTa
    .findAll(queryOptions)
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
