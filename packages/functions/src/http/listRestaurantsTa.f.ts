import * as functions from "firebase-functions";
import RestaurantsTa from "../models/RestaurantsTa";

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
    .then((result) => res.json({ error: null, result: result }))
    .catch((error) => res.json({ error }));
  });
});
