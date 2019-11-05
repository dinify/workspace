import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import auth from '@dinify/common/src/ducks/auth';
import restaurant from 'ducks/restaurant/reducers';
import ui from 'ducks/ui/reducers';
import menuCategory from 'ducks/menuCategory/reducers.ts';
import menuItem from 'ducks/menuItem/reducers';
import option from 'ducks/option/reducers';
import ingredient from 'ducks/ingredient/reducers';
import addon from 'ducks/addon/reducers';
import service from 'ducks/service/reducers';
import translation from 'ducks/translation/reducers';

import firebaseConfig from '@dinify/common/firebaseConfig.json';

import { reducer as formReducer } from 'redux-form';
import { snackbarReducer } from 'material-ui-snackbar-redux';
import rootEpic from './configureEpics';

// react-redux-firebase config
firebase.initializeApp(firebaseConfig);

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const restaurantPersistConfig = {
  key: 'restaurant',
  storage,
  whitelist: [
    'all',
    'loggedRestaurant',
    'defaultLanguage',
    'selectedRestaurant',
    'prefill',
    'ongoingRegistration',
    'onboardingToken',
    'wifi',
    'waiterboards'
  ],
};

const servicePersistConfig = {
  key: 'service',
  storage,
  whitelist: ['all'],
};

const commonReducers = {
  auth,
  restaurant: persistReducer(restaurantPersistConfig, restaurant),
  ui,
  menuCategory,
  menuItem,
  option,
  ingredient,
  addon,
  service: persistReducer(servicePersistConfig, service),
  translation,
  firebase: firebaseReducer,
  snackbar: snackbarReducer,
};

const epicMiddleware = createEpicMiddleware();

export default history => {
  const rootReducer = combineReducers({
    form: formReducer,
    router: connectRouter(history),
    ...commonReducers,
  });

  const persistedReducers = persistReducer(rootPersistConfig, rootReducer);

  const middlewares = [epicMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ diff: true, collapsed: true }));
  }

  const store = createStore(persistedReducers, applyMiddleware(...middlewares));

  epicMiddleware.run((action$, state$, ...rest) =>
    rootEpic(action$, state$, firebase, ...rest),
  );

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};
