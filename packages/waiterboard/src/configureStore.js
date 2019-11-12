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

import app from 'features/app/reducers';
import auth from '@dinify/common/src/ducks/auth';
import table from 'features/table/reducers';
import ui from 'features/ui/reducers';
import restaurant from 'features/restaurant/reducers';
import user from 'features/user/reducers';
import booking from 'features/booking/reducers';
import call from 'features/call/reducers';
import order from 'features/order/reducers';
import bill from 'features/bill/reducers';
import service from 'features/service/reducers';
import seat from 'features/seat/reducers';

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
