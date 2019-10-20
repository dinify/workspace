import eachOf from 'async/eachOf';
import * as taAPI from '../clients/ta';
import MongoRestaurants from '../schema/Restaurants';
import MongoReviews from '../schema/Reviews';
import RestaurantsTa from '../models/RestaurantsTa';
import { taRestaurantForSQL } from './restaurants';

import { langDistForRestaurant } from './langcounts';

const saveReviews = (locID, limit, page, done) => {
  taAPI.getReviews({ locID, limit, offset: page*limit }).then((res) => {
    eachOf(
      res.data,
      (review, key, cb) => {
        MongoReviews.update(
          {id: review.id},
          review,
          {upsert: true, setDefaultsOnInsert: true},
          (e) => {
            if (e) console.log(e, 'MongoReviews update fail');
            else cb();
          }
        );
      },
      (e) => {
        if (res.data.length) {
          console.log('next round for '+locID+' offset:'+(page+1)*limit);
          saveReviews(locID, limit, page + 1, done);
        } else {
          console.log('done for '+locID);
          done();
        }
      }
    )
  }).catch((err) => {
    console.log('404', err);
    setTimeout(() => saveReviews(locID, limit, page, done), 60000)
    // done();
  });
}

const doStuff = (restaurant, cb) => {
  saveReviews(restaurant.location_id, 50, 0, () => { // max limit 50
    langDistForRestaurant(restaurant, cb);
  });
}

const doIt = (limit, page) => {
  MongoRestaurants
  .find({ langDist: null })
  //.sort()
  //.skip(limit*page)
  .limit(limit)
  .exec((e, restaurants) => {
    eachOf(
      restaurants,
      (restaurant, key, cb) => {
        console.log(restaurant.name);

        RestaurantsTa
        .findOne({where: {location_id: restaurant.location_id}})
        .then((sqlRestaurant) => {
          if (!sqlRestaurant) { // if a restaurant is missing in SQL, copy it from mongo
            let restaurantForSQL = taRestaurantForSQL(restaurant);
            restaurantForSQL.id = restaurant._id.toString();
            RestaurantsTa.create(restaurantForSQL).then(() => {
              doStuff(restaurant, cb);
            });
          } else {
            doStuff(restaurant, cb);
          }
        })
      },
      (err) => {
        if (restaurants.length) {
          console.log('newPage', page + 1);
          doIt(limit, page + 1);
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
