import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import firebaseConfig from '@dinify/common/firebaseConfig.json';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


import { RootAction, RootState, Services } from 'typesafe-actions';

import { commonReducers } from './root-reducer';
import rootEpic from './root-epic';
import services from '../services';

firebase.initializeApp(firebaseConfig);


export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services,
});

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

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

  epicMiddleware.run(rootEpic);

  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};
