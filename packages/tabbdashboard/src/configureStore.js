import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import configureEpics from './configureEpics';
import Raven from 'raven-js'
import createRavenMiddleware from 'raven-for-redux'

import restaurant from './reducers/restaurant';
import progress from './reducers/progress';
import menuCategory from './reducers/menuCategory';
import menuItem from './reducers/menuItem';

import { reducer as formReducer } from 'redux-form'
Raven.config('https://e8c54e0fdec04337b8f4ee65a1164dee@sentry.io/1199917', {
  // options
}).install()

const commonReducers = { restaurant, progress, menuCategory, menuItem };

const configureStore = (options, storage) => {
  const { initialState, platformDeps = {}, platformEpics = [], platformReducers = {} } = options;

  const rootEpic = configureEpics({ ...platformDeps }, platformEpics);

  const reducers = combineReducers({
    form: formReducer,
    ...commonReducers,
    ...platformReducers,
  });

  const middlewares = [
    createEpicMiddleware(rootEpic),
    createRavenMiddleware(Raven, {
      // Optionally pass some options here.
    })
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ diff: true, collapsed: true }));
  }

  const enhancers = compose(applyMiddleware(...middlewares), autoRehydrate()); // , autoRehydrate()

  const store = createStore(reducers, initialState, enhancers);

  // let the magic happen :–)
  persistStore(store, { blacklist: ['progress'], storage }); // .purge() // in case you want to purge the store

  return store;
};

export default configureStore;
