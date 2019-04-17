require('dotenv').config();
require('./mongoconnect');
const functions = require('firebase-functions');
const Restaurants = require('./models/Restaurants');
const Reviews = require('./models/Reviews');

const Translate = require('@google-cloud/translate').Translate;

const projectId = 'tabb-global';
const translateClient = new Translate({ projectId });
const cors = require('cors')({
  origin: true,
});

exports.dbFind = functions.region('europe-west1').https.onRequest((req, res) => {
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
exports.dbCount = functions.region('europe-west1').https.onRequest((req, res) => {
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
exports.dbAggregate = functions.region('europe-west1').https.onRequest((req, res) => {
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
exports.translate = functions.region('europe-west1').https.onRequest((req, res) => {
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
