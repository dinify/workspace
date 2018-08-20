import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import configureEpics from './configureEpics';
import table from './ducks/table'
import guests from './ducks/guests'
import ui from './ducks/ui'
import restaurant from './ducks/restaurant'
import user from './ducks/user'
import booking from './ducks/booking'
import call from './ducks/call'
import order from 'ducks/order'
import bill from 'ducks/bill'
import service from 'ducks/service'

const commonReducers = {
  table,
  guests,
  ui,
  restaurant,
  user,
  booking,
  call,
  order,
  bill,
  service
}

const configureStore = (options, storage) => {
  const { initialState, platformDeps = {}, platformEpics = [], platformReducers = {} } = options;

  const rootEpic = configureEpics({ ...platformDeps }, platformEpics);

  const reducers = combineReducers({
    ...commonReducers,
    ...platformReducers
  });

  const middlewares = [createEpicMiddleware(rootEpic)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({
      diff: true,
      collapsed: true,
      predicate: (getState, action) => true//!action.type.includes('POLLING')
    }));
  }

  const enhancers = compose(applyMiddleware(...middlewares), autoRehydrate());

  const store = createStore(reducers, initialState, enhancers);

  // let the magic happen :–)
  persistStore(store, { blacklist: ['guests', 'tables', 'restaurant'], storage }); // .purge() // in case you want to purge the store

  return store;
};

export default configureStore;
