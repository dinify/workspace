import { createEpicMiddleware } from 'redux-observable';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { init, RematchRootState } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import * as models from './models';

import auth from '@dinify/common/src/features/auth/reducers';
import restaurant from './features/restaurant/reducers';
import ui from './features/ui/reducers';
import menuCategory from './features/menuCategory/reducers';
import menuItem from './features/menuItem/reducers';
import option from './features/option/reducers';
import ingredient from './features/ingredient/reducers';
import addon from './features/addon/reducers';
import service from './features/service/reducers';
import translation from './features/translation/reducers';
import transaction from './features/transaction/reducers';

import firebaseConfig from '@dinify/common/firebaseConfig.json';

import { reducer as formReducer } from 'redux-form';
import { snackbarReducer } from 'material-ui-snackbar-redux';
import rootEpic from './configureEpics';

// react-redux-firebase config
firebase.initializeApp(firebaseConfig);

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
  transaction
};

const epicMiddleware = createEpicMiddleware();

const loading = createLoadingPlugin({});

const makeStore = (history: any) => {

  const middlewares = [epicMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ diff: true, collapsed: true }));
  }

  const store = init({
    redux: {
      reducers: {
        form: formReducer,
        router: connectRouter(history),
        ...commonReducers,
      },
      middlewares
    },
    models,
    plugins: [loading],
  });

  epicMiddleware.run((action$, state$, ...rest) =>
    rootEpic(action$, state$, firebase, ...rest),
  );

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};

export default makeStore;

const s = makeStore({}).store;

export type Store = typeof s;
export type Dispatch = typeof s.dispatch;
export type RootState = RematchRootState<typeof models>;
