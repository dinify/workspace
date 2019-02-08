import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootEpic from './configureEpics';
import Raven from 'raven-js';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';

import auth from '@dinify/common/dist/ducks/auth';
import restaurant from 'ducks/restaurant';
import ui from 'ducks/ui';
import menuCategory from 'ducks/menuCategory';
import menuItem from 'ducks/menuItem';
import option from 'ducks/option';
import ingredient from 'ducks/ingredient';
import addon from 'ducks/addon';
import service from 'ducks/service';

import { reducer as formReducer } from 'redux-form';

Raven.config('https://e8c54e0fdec04337b8f4ee65a1164dee@sentry.io/1199917', {
  // options
}).install();

const commonReducers = {
  auth,
  restaurant,
  ui,
  menuCategory,
  menuItem,
  option,
  ingredient,
  addon,
  service,
  firebase: firebaseReducer
};

const firebaseConfig = {
  apiKey: "AIzaSyAwKYz-JN76QWYpK60TEL1YJhV_cIh9ciM",
  authDomain: "tabb-global.firebaseapp.com",
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
    form: formReducer,
    ...commonReducers,
    ...platformReducers,
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
  persistStore(store, { blacklist: ['progress'], storage }); // .purge() // in case you want to purge the store

  return store;
};

export default configureStore({
  initialState: {},
  platformDeps: {},
  platformEpics: [],
  platformReducers: {},
});
