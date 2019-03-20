import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';
import rootEpic from 'configureEpics.js';

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


const commonReducers = {
  auth,
  table,
  ui,
  restaurant,
  user,
  booking,
  call,
  order,
  bill,
  service,
  seat,
  firebase: firebaseReducer
}

const firebaseConfig = {
  apiKey: "AIzaSyCRg0En-xj3Ky02oElBV3HogOCZlPEdd30",
  authDomain: "waiterboard.dinify.app",
  databaseURL: "https://tabb-global.firebaseio.com",
  projectId: "tabb-global",
  storageBucket: "tabb-global.appspot.com",
  messagingSenderId: "448538111630"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'profiles',
  useFirestoreForProfile: true,
}
firebase.initializeApp(firebaseConfig)

const configureStore = (options, storage) => {
  const {
    initialState,
    platformReducers = {}
  } = options;

  const epicMiddleware = createEpicMiddleware();

  const reducers = combineReducers({
    ...commonReducers,
    ...platformReducers
  });

  const middlewares = [
    epicMiddleware
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ diff: true, collapsed: true }));
  }

  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    applyMiddleware(...middlewares),
    autoRehydrate(),
  )(createStore);

  const store = createStoreWithFirebase(reducers, initialState);

  epicMiddleware.run(rootEpic);

  // let the magic happen :–)
  persistStore(store, { blacklist: ['guests', 'tables', 'restaurant', 'seat'], storage }); // .purge() // in case you want to purge the store

  return store;
};

export default configureStore({
  initialState: {},
  platformDeps: {},
  platformEpics: [],
  platformReducers: {},
});
