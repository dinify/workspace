import * as functions from "firebase-functions";
import CampaignStatuses from '../models/CampaignStatuses';

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      targetId,
      type = 'default',
      status,
      campaign = 'default'
    } = req.body;

    if (!targetId || !status) {
      res.json({ error: 'required field missing' })  
    }

    CampaignStatuses.create({
      target_id: targetId,
      type,
      status,
      campaign
    })
    .then((o) => {
      res.json({ error: null, result: o.get() })
    })
    .catch((error) => res.json({ error }));
  });
});
