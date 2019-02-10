require('dotenv').config()
import Restaurants from './models/Restaurants';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoconnect from './mongoconnect';
import { Translate } from '@google-cloud/translate';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const projectId = 'tabb-global';
const translateClient = new Translate({ projectId });

// API calls
app.post('/api/db/find', (req, res) => {
  const {
    query = {},
    skip = 0,
    limit = 100,
    sort = {}
  } = req.body;
  Restaurants.find(query).sort(sort).skip(skip).limit(limit).exec((e, result) => {
    if (e) {
      res.json({ error: e })
    } else {
      res.json({ error: null, result: result })
    }
  });
});

app.post('/api/translate', (req, res) => {
  const {
    text = '',
    from = 'cs',
    to = 'en'
  } = req.body;
  translateClient
    .translate(text, {from, to})
    .then(results => {
      const translation = results[0];
      res.json({ error: null, result: translation })
    })
    .catch(e => {
      res.json({ error: e })
    });
});

app.post('/api/db/count', (req, res) => {
  const {
    query = {}
  } = req.body;
  Restaurants.count(query).exec((e, result) => {
    console.log(e);
    console.log(result);
    if (e) {
      res.json({ error: e })
    } else {
      res.json({ error: null, result: result })
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  console.log('Production');
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
