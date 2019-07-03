import * as functions from "firebase-functions";
import PublishRequests from '../models/PublishRequests';
import Restaurants from '../models/Restaurants';

const cors = require('cors')({
  origin: true,
});

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      publishRequestId,
      status = 'approved'
    } = req.body;

    if (!publishRequestId) {
      res.status(400).json({ error: 'required parameter missing: publishRequestId' });
    }
    else {
      PublishRequests.findOne({
        where: {
          id: publishRequestId
        }
      }).then((o: any) => {
        if (!o) {
          res.status(404).json({error: `Publish request not found: ${publishRequestId}`});
        }
        else {
          o.status = status;
          o.save();
          const rid = o.restaurant_id;
          Restaurants.findOne({where: {id: rid}})
            .then((r: any) => {
              if (!o) {
                res.status(404).json({error: `Restaurant not found: ${rid}`});
              }
              else {
                //
                r.published = true;
                r.save();
                res.json({ publishRequest: o, restaurant: r });
              }
            }).catch(err => res.status(400).json({ error: err }))
        }
      }).catch(err => res.status(400).json({ error: err }))
    }
  });
});
