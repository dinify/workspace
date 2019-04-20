import * as functions from "firebase-functions";
import Tokens from "../models/Tokens";

const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      restaurantId
    } = req.body;
    Tokens.findOne({ restaurantId }, (err, token) => {
      if (err) res.json({ error: err });
      if (token) {
        res.json({ error: null, result: token })
      } else {
        Tokens.create({
          restaurantId,
          token: uidgen.generateSync()
        }, (e, result) => {
          if (e) {
            res.json({ error: e })
          } else {
            res.json({ error: null, result: result })
          }
        });
      }
    });
  });
});
