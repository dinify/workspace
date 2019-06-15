import * as functions from "firebase-functions";
import RestaurantsTa from '../models/RestaurantsTa';
import TargetingTags from '../models/TargetingTags';
import TargetingTaggables from '../models/TargetingTaggables';

const cors = require('cors')({
  origin: true,
});

const createTaggable = (tt, locationId, res) => {
  const ttId = tt.id;
  TargetingTaggables.create({
    targeting_tag_id: ttId,
    item_type: 'App/Models/RestaurantTa',
    item_id: locationId,
  }).then((taggable) => {
    console.log('New targeting taggable created');
    res.json({ error: null, result: taggable.get() });
  }).catch((err) => res.json({ error: err }));
}

const removeTaggable = (tt, locationId, res) => {
  const ttId = tt.id;
  TargetingTaggables.destroy({
    where: {
      targeting_tag_id: ttId,
      item_type: 'App/Models/RestaurantTa',
      item_id: locationId,
    }
  }).then(() => {
    console.log('Targeting taggable deleted');
    res.json({ error: null, result: 'deleted' });
  }).catch((err) => res.json({ error: err }));
}

exports = module.exports = functions.region('europe-west1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const {
      tagLabel,
      locationId,
      unassign = false
    } = req.body;

    if (!tagLabel || !locationId) {
      res.json({ error: 'required field missing' })  
    }

    RestaurantsTa.findOne({
      where: { location_id: locationId }
    }).then((r) => {
      if (!r) res.json({ error: 404 })
      else {
        TargetingTags.findOne({
          where: { label: tagLabel }
        }).then((tt) => {
          if (!tt) {
            if (unassign) res.json({ error: 'Targeting tag doesnt exist' });
            else {
              TargetingTags.create({
                label: tagLabel
              }).then((newTt) => {
                console.log('New targeting tag created');
                createTaggable(newTt.get(), locationId, res);
              })
            }
          } else {
            if (unassign) removeTaggable(tt.get(), locationId, res);
            else createTaggable(tt, locationId, res);
          }
        }).catch((err) => res.json({ error: err }));
      }
    }).catch((err) => res.json({ error: err }));
  });
});
