import * as functions from "firebase-functions";
import Tokens from "../models/Tokens";

const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();

const cors = require('cors')({
  origin: true,
});

const fetchToken = ({ restaurantId }) => new Promise((resolve, reject) => {
  if (!restaurantId) reject('restaurantId required');
  Tokens.findOne({ restaurantId }, (err, token) => {
    if (err) reject(err);
    if (token) resolve(token);
    else {
      Tokens.create({
        restaurantId,
        token: uidgen.generateSync()
      }, (e, result) => {
        if (result) resolve(result)
        else reject(e)
      });
    }
  });
})

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const { restaurantId } = req.body;

    fetchToken({ restaurantId })
      .then((token) => res.json({ error: null, result: token }))
      .catch((e) => res.json({ error: e }))

  });
});
