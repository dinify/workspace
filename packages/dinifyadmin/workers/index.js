import * as taAPI from '../api/ta';
import Restaurants from '../models/Restaurants';
import async from 'async';
import mongoose from 'mongoose';

const mongoURL = 'mongodb://piquerg:KsVN4896bYdGLDBJ@35.204.100.96:27017/main';
mongoose.connect(mongoURL, { useNewUrlParser: true });


taAPI.getRestaurants({ locID: 274707, limit: 50, offset: 10*50 }).then((res) => {

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
})

// brno 274714
// prague 274707
