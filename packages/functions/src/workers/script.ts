import '../mongo.config';
//import '../mysql.config';
import RestaurantsTa from '../models/RestaurantsTa';
import TargetingTags from '../models/TargetingTags';
import TargetingTaggables from '../models/TargetingTaggables';

//import Restaurants from '../models/Restaurants';

// testing

const body = {
  tagLabel: 'selection-1',
  locationId: 1808862
}

const { tagLabel, locationId } = body;

const createTaggable = (tt) => {
  const ttId = tt.id;
  TargetingTaggables.create({
    targeting_tag_id: ttId,
    item_type: 'App/Models/RestaurantTa',
    item_id: locationId,
  }).then(() => {
    console.log("done");
    console.log('New targeting taggable created');
  }).catch(() => console.log("failed"))
}

RestaurantsTa.findOne({
  where: { location_id: locationId }
}).then((r) => {
  if (!r) console.log('404')
  else {
    TargetingTags.findOne({
      where: { label: tagLabel }
    }).then((tt) => {
      if (!tt) {
        TargetingTags.create({
          label: tagLabel
        }).then((newTt) => {
          console.log('New targeting tag created');
          createTaggable(newTt.get());
        })
      } else {
        createTaggable(tt);
      }
    })
  }
})
