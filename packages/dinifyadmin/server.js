import mongoose from 'mongoose';
//import Restaurants from './models/Restaurants';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

// const mongoURL = 'mongodb://user:pass@ip:27017/dbname';
// mongoose.connect(mongoURL, { useNewUrlParser: true });

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
//app.post('/api/db/find', (req, res) => {
//  const {
//    query = {},
//    skip = 0,
//    limit = 100
//  } = req.body;
//  Restaurants.find(query).skip(skip).limit(limit).exec((e, result) => {
//    if (e) {
//      res.json({ error: e })
//    } else {
//      res.json({ error: null, result: result })
//    }
//  });
//});
//
//app.post('/api/db/count', (req, res) => {
//  const {
//    query = {}
//  } = req.body;
//  Restaurants.count(query).exec((e, result) => {
//    console.log(e);
//    console.log(result);
//    if (e) {
//      res.json({ error: e })
//    } else {
//      res.json({ error: null, result: result })
//    }
//  });
//});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
