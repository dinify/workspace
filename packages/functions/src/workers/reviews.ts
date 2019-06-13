import async from 'async';
import * as taAPI from '../clients/ta';
import MongoRestaurants from '../schema/Restaurants';
import MongoReviews from '../schema/Reviews';
import RestaurantsTa from '../models/RestaurantsTa';
import ReviewsTa from '../models/ReviewsTa';
import { taRestaurantForSQL } from './restaurants';

import { langDistForRestaurant } from './langcounts';

const saveReviews = (locID, limit, page, done) => {
  taAPI.getReviews({ locID, limit, offset: page*limit }).then((res) => {
    async.eachOf(
      res.data,
      (review, key, cb) => {
        MongoReviews.update(
          {id: review.id},
          review,
          {upsert: true, setDefaultsOnInsert: true},
          (e) => {
            if (e) console.log(e, 'MongoReviews update fail');
            else {
              MongoReviews.findOne({id: review.id}).exec((e2, mongoReview) => {
                ReviewsTa.findOne({ where: {review_id: review.id} })
                .then((reviewTa) => {
                  cb();
                  if(reviewTa) { // update
                    return reviewTa.update(review);
                  } else { // insert
                    review.review_id = review.id;
                    review.id = mongoReview._id.toString();
                    review.language = review.lang;
                    return ReviewsTa.create(review);
                  }
                });
              })
            }
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
    console.log('404');
    done();
  });
}

const doStuff = (restaurant, cb) => {
  saveReviews(restaurant.location_id, 50, 0, () => { // max limit 50
    langDistForRestaurant(restaurant, cb);
  });
}

const doIt = (limit, page) => {
  MongoRestaurants
  .find()
  .sort({ _id: 1 })
  .skip(limit*page)
  .limit(limit)
  .exec((e, restaurants) => {
    async.eachOf(
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
