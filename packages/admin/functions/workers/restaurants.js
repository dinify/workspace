import * as taAPI from '../api/ta';
import Restaurants from '../models/Restaurants';
import async from 'async';


const doIt = (limit, page) => {
  taAPI.getRestaurants({ locID: 274707, limit, offset: page*limit }).then((res) => {

    res.data.forEach((restaurant) => {
      console.log(restaurant.email);
      console.log(restaurant.website);
      console.log(restaurant.phone);

      Restaurants.update(
        {location_id: restaurant.location_id},
        restaurant,
        {upsert: true, setDefaultsOnInsert: true},
        (e) => {
          if (e) console.log(e);
          else console.log('saved');
        }
      );

    });
    if (res.data.length) {
      setTimeout(() => doIt(limit, page + 1), 2000);
    } else {
      console.log('done');
    }
  })
}


const run = () => {
  doIt(50, 0);
}
export default run;

// brno 274714
// prague 274707
