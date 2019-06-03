import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducer as formReducer } from 'redux-form';
import { snackbarReducer } from 'material-ui-snackbar-redux';
import { firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import auth from '@dinify/common/dist/ducks/auth';
import ui from 'ducks/ui';
import user from 'ducks/user';
import restaurant from 'ducks/restaurant';
import menuCategory from 'ducks/menuCategory';
import menuItem from 'ducks/menuItem';
import booking from 'ducks/booking';
import cart from 'ducks/cart';
import bill from 'ducks/bill';
import seat from 'ducks/seat';
import firebaseConfig from '@dinify/common/firebaseConfig.json';
import rootEpic from './configureEpics';

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
  seat,
  snackbar: snackbarReducer,
  firebase: firebaseReducer,
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
