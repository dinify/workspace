import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootEpic from 'configureEpics.js';
import Raven from 'raven-js';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import auth from '@dinify/common/dist/ducks/auth';
import restaurant from 'ducks/restaurant';
import ui from 'ducks/ui';
import menuCategory from 'ducks/menuCategory';
import menuItem from 'ducks/menuItem';
import option from 'ducks/option';
import ingredient from 'ducks/ingredient';
import addon from 'ducks/addon';
import service from 'ducks/service';
import translation from 'ducks/translation';

import firebaseConfig from '@dinify/common/firebaseConfig.json';

import { reducer as formReducer } from 'redux-form';
import { snackbarReducer } from 'material-ui-snackbar-redux';

Raven.config('https://e8c54e0fdec04337b8f4ee65a1164dee@sentry.io/1199917', {
   // options
}).install();

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'profiles',
  useFirestoreForProfile: true,
}
firebase.initializeApp(firebaseConfig);

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const restaurantPersistConfig = {
  key: 'restaurant',
  storage,
  whitelist: ['loggedRestaurant', 'selectedRestaurant', 'prefill', 'ongoingRegistration']
}

const commonReducers = {
  auth,
  restaurant: persistReducer(restaurantPersistConfig, restaurant),
  ui,
  menuCategory,
  menuItem,
  option,
  ingredient,
  addon,
  service,
  translation,
  firebase: firebaseReducer,
  snackbar: snackbarReducer
};  

export default (options) => {
  const {
    initialState,
    platformReducers = {}
  } = options;

  const epicMiddleware = createEpicMiddleware();

  const rootReducer = combineReducers({
    form: formReducer,
    ...commonReducers,
    ...platformReducers,
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
