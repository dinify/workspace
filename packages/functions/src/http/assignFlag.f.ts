import * as functions from "firebase-functions";
import TargetingFlags from "../models/TargetingFlags";
import Restaurants from "../models/Restaurants";

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      restaurantId,
      flag,
      unassign = false
    } = req.body;

    if (!restaurantId || !flag) {
      res.json({ error: 'required field missing' })
    }

    TargetingFlags.update(
      {name: flag},
      {name: flag},
      {upsert: true, setDefaultsOnInsert: true},
      (e) => {
        if (e) console.log(e);

        let updObj = {};
        if (unassign) updObj = { $pull: { targetingFlags: flag } };
        else updObj = { $push: { targetingFlags: flag } };

        Restaurants.update(
          { _id: restaurantId },
          updObj,
          (err) => {
            res.json({ error: err })
          }
        );

      }
    );

  });
});
