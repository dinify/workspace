import * as taAPI from '../api/ta';
import Restaurants from '../models/Restaurants';
import Reviews from '../models/Reviews';
import async from 'async';
import eachOfSeries from 'async/eachOfSeries';
import eachOf from 'async/eachOf';

import { langDistForRestaurant } from './langcounts';

const saveReviews = (locID, limit, page, done) => {
  taAPI.getReviews({ locID, limit, offset: page*limit }).then((res) => {

    eachOf(
      res.data,
      (review, key, cb) => {
        Reviews.update(
          {id: review.id},
          review,
          {upsert: true, setDefaultsOnInsert: true},
          (e) => {
            if (e) console.log(e);
            cb()
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

const doIt = (limit, page) => {
  Restaurants
  .find()
  .sort({ num_reviews: -1, _id: 1 })
  .skip(limit*page)
  .limit(limit)
  .exec((e, restaurants) => {
    eachOf(
      restaurants,
      (restaurant, key, cb) => {
        console.log('//////////////////////////');
        console.log(restaurant.name);
        saveReviews(restaurant.location_id, 50, 0, () => {
          langDistForRestaurant(restaurant, cb);
        });
      },
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
