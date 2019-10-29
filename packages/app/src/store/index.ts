import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { RootAction, RootState, Services } from 'typesafe-actions';

import { commonReducers } from './root-reducer';
import rootEpic from './root-epic';
import services from '../services';

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

const rootReducer = combineReducers(commonReducers);

const persistedReducers = persistReducer(rootPersistConfig, rootReducer);

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger({ diff: true, collapsed: true }));
}

middlewares.push(epicMiddleware);

export const store = createStore(
  persistedReducers,
  applyMiddleware(...middlewares)
);

epicMiddleware.run(rootEpic);

export const persistor = persistStore(store);
