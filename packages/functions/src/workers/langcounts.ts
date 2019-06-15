import _ from 'lodash';
import * as taAPI from '../clients/ta';
import Restaurants from '../schema/Restaurants';
import Reviews from '../schema/Reviews';
import async from 'async';
import eachOf from 'async/eachOf';
import RestaurantsTa from '../models/RestaurantsTa';

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

const langGroupFromLangDist = (langDist, langs) => {
  let countSum = 0;
  let countRelSum = 0;
  langs.forEach((lang) => {
    if (langDist[lang]) {
      countSum += langDist[lang].count;
      countRelSum += langDist[lang].countRel;
    }
  })
  return {
    count: countSum,
    countRel: countRelSum
  }
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
      langGroups: {
        eastAsia: langGroupFromLangDist(langDistWithRel, ['ja', 'ko', 'zhCN', 'zhTW'])
      },
      targetLang,
      targetLangRel
    };

    Restaurants.update(
      {location_id: restaurant.location_id},
      updObj,
      (err) => {
        if (err) console.log(err);
        //else console.log('saved');
        cb();
      }
    );

    RestaurantsTa.update({
      language_distribution: updObj.langDist,
      num_reviews: updObj.num_reviews,
      language_groups: updObj.langGroups,
      target_languages: updObj.targetLang,
      target_languages_rel: updObj.targetLangRel
    }, {
      where: {location_id: restaurant.location_id}
    }).then(() => {
      console.log('RestaurantsTa langDist & num_reviews updated');
    });

  })
}

const doIt = (limit, page) => {
  Restaurants
  .find({ranking_geo: 'Berlin'})
  .sort({ num_reviews: -1, _id: 1 })
  .skip(limit*page)
  .limit(limit)
  .exec((e, restaurants) => {
    eachOf(
      restaurants,
      (restaurant, key, cb) => langDistForRestaurant(restaurant, cb),
      (err) => {
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
