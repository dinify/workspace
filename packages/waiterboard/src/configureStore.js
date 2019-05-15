import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import rootEpic from 'configureEpics.js';
import { reducer as formReducer } from 'redux-form';

import auth from '@dinify/common/dist/ducks/auth';
import table from 'ducks/table'
import ui from 'ducks/ui'
import restaurant from 'ducks/restaurant'
import user from 'ducks/user'
import booking from 'ducks/booking'
import call from 'ducks/call'
import order from 'ducks/order'
import bill from 'ducks/bill'
import service from 'ducks/service'
import seat from 'ducks/seat'

import firebaseConfig from '@dinify/common/firebaseConfig.json';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const restaurantPersistConfig = {
  key: 'restaurant',
  storage,
  whitelist: [
    'selectedRestaurant',
    'selectedWBId'
  ]
}

const commonReducers = {
  auth,
  table,
  ui,
  restaurant: persistReducer(restaurantPersistConfig, restaurant),
  user,
  booking,
  call,
  order,
  bill,
  service,
  seat,
  firebase: firebaseReducer,
  form: formReducer,
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'profiles',
  useFirestoreForProfile: true,
}
firebase.initializeApp(firebaseConfig)

export default (options) => {
  const {
    initialState,
    platformReducers = {}
  } = options;

  const epicMiddleware = createEpicMiddleware();

  const rootReducer = combineReducers({
    ...commonReducers,
    ...platformReducers
  });

  const reducers = persistReducer(rootPersistConfig, rootReducer);
 
  const middlewares = [
    epicMiddleware
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ diff: true, collapsed: true }));
  }

  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    applyMiddleware(...middlewares),
  )(createStore);

  const store = createStoreWithFirebase(reducers, initialState);

  epicMiddleware.run(rootEpic);

  const persistor = persistStore(store);

  return {
    store,
    persistor
  };
};
