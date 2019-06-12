import * as functions from "firebase-functions";
import TargetingFlags from "../schema/TargetingFlags";
import Restaurants from "../schema/Restaurants";

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const events = req.body || [];

    events.map((eventObject) => {
      const { email, event, timestamp } = eventObject;

      Restaurants.findOne({ email }).exec((e, restaurant) => {
        if (!restaurant) res.sendStatus(404);
        else {
          restaurant.emailStatus = event;
          restaurant.emailStatuses.push({ event, timestamp });
          restaurant.save(() => {
            res.sendStatus(200);
          });
        }
      })
    })

  });
});
