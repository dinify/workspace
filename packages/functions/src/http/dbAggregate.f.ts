import * as functions from "firebase-functions";
import Reviews from "../models/Reviews";

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      query = []
    } = req.body;
    Reviews.aggregate(query).exec((e, result) => {
      if (e) {
        res.json({ error: e })
      } else {
        res.json({ error: null, result })
      }
    })
  });
});
