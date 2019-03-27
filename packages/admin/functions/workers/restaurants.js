import * as taAPI from '../api/ta';
import Restaurants from '../models/Restaurants';
import async from 'async';


const doIt = (limit, page) => {
  taAPI.getRestaurants({ locID: 187323, limit, offset: page*limit }).then((res) => {

    res.data.forEach((restaurant) => {
      console.log(restaurant.email);
      console.log(restaurant.website);

      Restaurants.update(
        {location_id: restaurant.location_id},
        restaurant,
        {upsert: true, setDefaultsOnInsert: true},
        (e) => {
          if (e) console.log(e);
        }
      );

    });
    if (res.data.length) {
      setTimeout(() => doIt(limit, page + 1), 100);
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
// berlin 187323
