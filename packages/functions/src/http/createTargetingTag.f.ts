import * as functions from "firebase-functions";
import TargetingTags from '../models/TargetingTags';

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const body = req.body;

    TargetingTags.create({
      ...body
    }).then((r) => {
      res.json(r.get());
    }).catch((err) => res.json({ error: err }));
  });
});
