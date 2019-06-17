import * as functions from "firebase-functions";
import CampaignStatuses from '../models/CampaignStatuses';

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      token,
      type = 'default',
      status,
      campaign = 'default'
    } = req.body;

    if (!targetId || !status) {
      return res.json({ error: 'required field missing' })
    }

    // get taget id from token in url
    Token.findOne({
      where: {
        id: token
      }
    }).then((o) => {
      CampaignStatuses.create({
        target_id: o.target_id,
        type,
        status,
        campaign
      })
      .then((o) => {
        res.json({ error: null, result: o.get() })
      }).catch((error) => res.json({ error }));
    }).catch((error) => res.json({ error }));
  });
});
