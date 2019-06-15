import * as taAPI from '../clients/ta';
import MongoRestaurants from '../schema/Restaurants';
import RestaurantsTa from '../models/RestaurantsTa';

const locations = {
  brno: 274714,
  prague: 274707,
  berlin: 187323
}

export const taRestaurantForSQL = (restaurant) => {
  restaurant.city = restaurant.ranking_geo
  if (!restaurant.city || restaurant.city.length < 1) {
    restaurant.city = restaurant.location_string
  }
  if (restaurant.longitude && restaurant.latitude) {
    restaurant.location = {
      type: 'Point', coordinates: [restaurant.longitude, restaurant.latitude]
    }
  }
  restaurant.photo_url = ''
  if (restaurant.photo && restaurant.photo.images && restaurant.photo.images.large) {
    restaurant.photo_url = restaurant.photo.images.large.url
  }
  if (restaurant.website) restaurant.website = restaurant.website.substring(0, 254);
  return restaurant;
}

const doIt = (limit, page) => {
  taAPI.getRestaurants({ locID: locations.berlin, limit, offset: page*limit }).then((res) => {

    res.data.forEach((restaurant) => {
      console.log(restaurant.email);
      // mongo
      const query = { location_id: restaurant.location_id };
      MongoRestaurants.update(
        query,
        restaurant,
        {upsert: true, setDefaultsOnInsert: true},
        (e) => {
          if (e) console.log(e);
          else {
            MongoRestaurants.findOne(query).exec((e2, mongoR) => {
              // mysql
              const restaurantTa = taRestaurantForSQL(restaurant);
              RestaurantsTa.findOne({ where: query })
              .then((rTa) => {
                if(rTa) { // update
                  return rTa.update(restaurantTa);
                } else { // insert
                  restaurantTa.id = mongoR._id.toString();
                  return RestaurantsTa.create(restaurantTa);
                }
              })
            })
          }
        }
      );
    });
    if (res.data.length) {
      doIt(limit, page + 1);
    } else {
      console.log('done');
    }
  }).catch(console.log)
}

const run = () => {
  doIt(50, 0); // 50 max
}
export default run;
