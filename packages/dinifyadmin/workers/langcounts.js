import * as taAPI from '../api/ta';
import Restaurants from '../models/Restaurants';
import Reviews from '../models/Reviews';
import async from 'async';
import eachOf from 'async/eachOf';
import _ from 'lodash';

const getLangDist = (location_id, cb) => {
  Reviews.aggregate([
    { $match: { location_id } },
    { "$unwind": "$lang" },
    { "$group": {
        "_id": "$lang",
        "count": { "$sum": 1 }
    }}
  ]).exec(cb);
}

export const langDistForRestaurant = (restaurant, cb) => {
  console.log("langDist for "+restaurant.name);
  getLangDist(restaurant.location_id, (e, langDist) => {
    const langs = _.map(langDist, '_id');
    const counts = _.map(langDist, 'count');
    const total = _.sum(counts);
    const targetLangDist = _.filter(langDist, (o) => o._id !== 'en');
    const targetLangs = _.map(targetLangDist, 'count');
    const targetLang = _.sum(targetLangs);
    const targetLangRel = total ? targetLang/total : 0;
    const langDistWithRel = {};
    langDist.forEach((l) => {
      langDistWithRel[l._id] = {
        count: l.count,
        countRel: total ? l.count/total : 0
      }
    })
    const updObj = {
      num_reviews: total,
      langDist: langDistWithRel,
      targetLang,
      targetLangRel
    };
    console.log(updObj.targetLangRel);
    Restaurants.update(
      {location_id: restaurant.location_id},
      updObj,
      (e) => {
        if (e) console.log(e);
        //else console.log('saved');
        cb();
      }
    );
  })
}

const doIt = (limit, page) => {
  Restaurants
  .find({ num_reviews: 0 })
  .sort({ num_reviews: -1, _id: 1 })
  .skip(limit*page)
  .limit(limit)
  .exec((e, restaurants) => {
    eachOf(
      restaurants,
      (restaurant, key, cb) => langDistForRestaurant(restaurant, cb),
      (e) => {
        if (restaurants.length) {
          doIt(limit, page + 1)
        } else {
          console.log('COMPLETED');
        }
      }
    )
  })
}


const run = () => {
  doIt(100, 0);
}
export default run;
