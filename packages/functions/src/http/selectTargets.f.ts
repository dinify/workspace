import * as functions from "firebase-functions";
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
          campaignStatuses: [],
          emailStatuses: [],
          targetingTagLabels: []
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

    // query RestaurantTa with filter

    // for each restaurant_ta in results

      // process data for target
      let processedData = {};
      Object.entries(data).forEach(([key, value]) => {
        processedData[key] = restaurant_ta[value];
      });

      // create target with data
  });
});
