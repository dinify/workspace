import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { firebaseReducer } from 'react-redux-firebase';
import { reducer as formReducer } from 'redux-form';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import app from 'ducks/app';
import auth from '@dinify/common/src/ducks/auth';
import table from 'ducks/table';
import ui from 'ducks/ui';
import restaurant from 'ducks/restaurant';
import user from 'ducks/user';
import booking from 'ducks/booking';
import call from 'ducks/call';
import order from 'ducks/order';
import bill from 'ducks/bill';
import service from 'ducks/service';
import seat from 'ducks/seat';

import firebaseConfig from '@dinify/common/firebaseConfig.json';
import rootEpic from 'configureEpics.js';

firebase.initializeApp(firebaseConfig);

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: []
};

const appPersistConfig = {
  key: 'app',
  storage,
  whitelist: [
    'selectedRestaurant',
    'selectedWBId'
  ]
};

const commonReducers = {
  app: persistReducer(appPersistConfig, app),
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
  firebase: firebaseReducer,
  form: formReducer,
};

const epicMiddleware = createEpicMiddleware();

export default (history) => {
  const rootReducer = combineReducers({
    form: formReducer,
    router: connectRouter(history),
    ...commonReducers,
  });

  const persistedReducers = persistReducer(rootPersistConfig, rootReducer);

  const middlewares = [
    epicMiddleware,
    routerMiddleware(history)
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ diff: true, collapsed: true }));
  }

  const store = createStore(
    persistedReducers,
    applyMiddleware(...middlewares)
  );

  epicMiddleware.run((action$, state$, ...rest) => rootEpic(action$, state$, firebase, ...rest));

  const persistor = persistStore(store);

  return {
    store,
    persistor
  };
};
