import '../mongo.config';
//import '../mysql.config';
import Restaurants from '../schema/Restaurants';
import RestaurantsTa from '../models/RestaurantsTa';

// testing
RestaurantsTa.findOne({}).then((r) => {
  console.log(r.get());
});
