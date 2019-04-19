import * as functions from "firebase-functions";
import Restaurants from "../models/Restaurants";

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      query = {},
      skip = 0,
      limit = 100,
      sort = {}
    } = req.body;
    Restaurants.find(query).sort(sort).skip(skip).limit(limit).exec((e, result) => {
      if (e) {
        res.json({ error: e })
      } else {
        res.json({ error: null, result: result })
      }
    });
  });
});
