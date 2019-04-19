import * as functions from "firebase-functions";
import { Translate } from "@google-cloud/translate";
import Restaurants from "../models/Restaurants";

const translateClient = new Translate({ projectId: process.env.GCLOUD_PROJECT });

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      text = '',
      from = 'cs',
      to = 'en'
    } = req.body;
    translateClient
      .translate(text, {from, to})
      .then(results => {
        const translation = results[0];
        res.json({ error: null, result: translation })
      })
      .catch(e => {
        res.json({ error: e })
      });
  });
});
