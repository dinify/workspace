import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import auth from '@dinify/common/src/ducks/auth/reducers';
import ui from './ducks/ui';
import user from './ducks/user';
import restaurant from './ducks/restaurant/reducers';
import menuCategory from './ducks/menuCategory';
import menuItem from './ducks/menuItem';
import booking from './ducks/booking';
import cart from './ducks/cart/reducers';
import bill from './ducks/bill';
import service from './ducks/service';
import seat from './ducks/seat';
import firebaseConfig from '@dinify/common/firebaseConfig.json';
import rootEpic from './configureEpics';

import { StateType } from 'typesafe-actions';

const { MapToList, handleEpicAPIError } = require('@dinify/common/dist/lib/FN');
const snackbarReducer = require('material-ui-snackbar-redux').snackbarReducer;


firebase.initializeApp(firebaseConfig);

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const restaurantPersistConfig = {
  key: 'restaurant',
  storage,
  whitelist: []
}

const menuCategoryPersistConfig = {
  key: 'menuCategory',
  storage,
  whitelist: ['all']
}

const menuItemPersistConfig = {
  key: 'menuItem',
  storage,
  whitelist: ['all']
}

const servicePersistConfig = {
  key: 'service',
  storage,
  whitelist: ['all']
}

const commonReducers = {
  auth,
  ui,
  user,
  restaurant: persistReducer(restaurantPersistConfig, restaurant),
  menuCategory: persistReducer(menuCategoryPersistConfig, menuCategory),
  menuItem: persistReducer(menuItemPersistConfig, menuItem),
  booking,
  cart,
  bill,
  service: persistReducer(servicePersistConfig, service),
  seat,
  snackbar: snackbarReducer,
  firebase: firebaseReducer,
  form: formReducer,
};

const epicMiddleware = createEpicMiddleware();

const staticRootReducer = combineReducers(commonReducers);

export type RootState = StateType<typeof staticRootReducer>;

export default (history: any) => {
  const rootReducer = combineReducers({
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
    persistor,
  };
};
