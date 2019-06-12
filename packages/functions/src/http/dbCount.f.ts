import * as functions from "firebase-functions";
import Restaurants from "../schema/Restaurants";

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      query = {}
    } = req.body;
    Restaurants.count(query).exec((e, result) => {
      if (e) {
        res.json({ error: e })
      } else {
        res.json({ error: null, result: result })
      }
    });
  });
});
