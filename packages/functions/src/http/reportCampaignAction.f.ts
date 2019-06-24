import * as functions from "firebase-functions";
import Tokens from '../models/Tokens';
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

    if (!token || !status) {
      res.json({ error: 'required field missing' })
      return;
    }

    // get taget id from token in url
    Tokens.findOne({
      where: {
        id: token
      }
    }).then((o: any) => {

      if (!o) {
        res.json({ error: 'Token not found' });
      } else {
        if (o.item_type === 'App\\Models\\Target' && o.type === 'signup') {
          // token -> target -> cohort -> campaign
          CampaignStatuses.create({
            target_id: o.item_id,
            type,
            status,
            campaign
          })
          .then((campaignStatus) => {
            res.json(campaignStatus.get());
          }).catch((error) => {
            res.json({ error: 'CampaignStatuses create error' });
            console.error(error);
          });
        }
        else res.json({ error: 'Invalid token' });
      }

    }).catch((error) => {
      res.json({ error: 'Tokens findOne error' });
      console.error(error);
    });
  });
});
