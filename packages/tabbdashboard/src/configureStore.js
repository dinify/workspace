import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import configureEpics from './configureEpics';

import restaurant from './ducks/restaurant';

const commonReducers = { restaurant };

const configureStore = (options, storage) => {
  const { initialState, platformDeps = {}, platformEpics = [], platformReducers = {} } = options;

  const rootEpic = configureEpics({ ...platformDeps }, platformEpics);

  const reducers = combineReducers({
    ...commonReducers,
    ...platformReducers,
  });

  const middlewares = [createEpicMiddleware(rootEpic)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ diff: true, collapsed: true }));
  }

  const enhancers = compose(applyMiddleware(...middlewares), autoRehydrate()); // , autoRehydrate()

  const store = createStore(reducers, initialState, enhancers);

  // let the magic happen :–)
  persistStore(store, { blacklist: ['ui', 'restaurant'], storage }); // .purge() // in case you want to purge the store

  return store;
};

export default configureStore;
