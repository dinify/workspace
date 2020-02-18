import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';

import { RootAction, RootState, Services } from 'typesafe-actions';

import * as models from 'models';
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

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger({ diff: true, collapsed: true }));
}

middlewares.push(epicMiddleware);

const loading = createLoadingPlugin({});

export const store = init({
  redux: {
    reducers: {
      ...commonReducers,
    },
    middlewares
  },
  models,
  plugins: [loading],
});

epicMiddleware.run(rootEpic);

export const persistor = persistStore(store);

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
// export type RootState = RematchRootState<typeof models>;
