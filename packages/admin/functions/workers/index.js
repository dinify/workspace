import reviews from './reviews';
import restaurants from './restaurants';
import langcounts from './langcounts';
import mongoconnect from '../mongoconnect';

import Reviews from '../models/Reviews';

//Reviews.aggregate([
//  { $match: { location_id: 783504 } },
//  { "$unwind": "$lang" },
//  { "$group": {
//      "_id": "$lang",
//      "count": { "$sum": 1 }
//  }}
//]).exec((err, locations) => {
//    if (err) throw err;
//    console.log(locations);
//})

// restaurants();
reviews();
// langcounts();
