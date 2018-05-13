import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
//import { composeWithDevTools } from 'remote-redux-devtools';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import configureEpics from './configureEpics';
//import { firebaseStateReducer, reactReduxFirebase } from 'react-redux-firebase';

import tables from './ducks/tables'
import guests from './ducks/guests'
import ui from './ducks/ui'
import restaurant from './ducks/restaurant'
import user from './ducks/user'

const commonReducers = { tables, guests, ui, restaurant, user }

const configureStore = (options, storage) => {
  const { initialState, platformDeps = {}, platformEpics = [], platformReducers = {} } = options;

  const rootEpic = configureEpics({ ...platformDeps }, platformEpics);

  const reducers = combineReducers({
    ...commonReducers,
    ...platformReducers,
    //firebase: firebaseStateReducer,
  });

  const middlewares = [createEpicMiddleware(rootEpic)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({
      diff: true,
      collapsed: true,
      predicate: (getState, action) => true//!action.type.includes('POLLING')
    }));
  }

  // Firebase config
  //const firebaseConfig = {
  //  apiKey: 'AIzaSyABS31YC1SUtzjyFlM97xD1be0R5XnwZZ4',
  //  authDomain: '<your-auth-domain>',
  //  databaseURL: 'https://tabb-4f53c.firebaseio.com',
  //  storageBucket: '<your-storage-bucket>'
  //}
  // react-redux-firebase options
  //const config = {
  //  userProfile: 'users', // firebase root where user profiles are stored
  //  enableLogging: false, // enable/disable Firebase's database logging
  //}


  const enhancers = compose(applyMiddleware(...middlewares), autoRehydrate());

  const store = createStore(reducers, initialState, enhancers);




  // let the magic happen :–)
  persistStore(store, { blacklist: ['guests', 'tables', 'ui', 'restaurant'], storage }); // .purge() // in case you want to purge the store

  return store;
};

export default configureStore;
