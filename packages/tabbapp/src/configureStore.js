import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import configureEpics from './configureEpics';
import { reducer as formReducer } from 'redux-form';
import { snackbarReducer } from 'material-ui-snackbar-redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase'

import auth from 'ducks/auth';
import ui from 'ducks/ui';
import user from 'ducks/user';
import restaurant from 'ducks/restaurant';
import menuCategory from 'ducks/menuCategory';
import menuItem from 'ducks/menuItem';
import booking from 'ducks/booking';
import cart from 'ducks/cart';
import bill from 'ducks/bill';
import seat from 'ducks/seat';

const commonReducers = {
  auth,
  ui,
  user,
  restaurant,
  menuCategory,
  menuItem,
  booking,
  cart,
  bill,
  seat,
  snackbar: snackbarReducer,
  firebase: firebaseReducer,
};

const firebaseConfig = {
  apiKey: "AIzaSyAwKYz-JN76QWYpK60TEL1YJhV_cIh9ciM",
  authDomain: "tabb-global.firebaseapp.com",
  databaseURL: "https://tabb-global.firebaseio.com",
  projectId: "tabb-global",
  storageBucket: "tabb-global.appspot.com",
  messagingSenderId: "448538111630"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'profiles',
  useFirestoreForProfile: true,
}
firebase.initializeApp(firebaseConfig)

const configureStore = (options, storage) => {
  const {
    initialState,
    platformDeps = {},
    platformEpics = [],
    platformReducers = {},
  } = options;

  const rootEpic = configureEpics({ ...platformDeps }, platformEpics);

  const reducers = combineReducers({
    form: formReducer,
    ...commonReducers,
    ...platformReducers,
  });

  const middlewares = [
    createEpicMiddleware(rootEpic)
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger({ diff: true, collapsed: true }));
  }

  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    applyMiddleware(...middlewares),
    autoRehydrate(),
  )(createStore)

  const store = createStoreWithFirebase(reducers, initialState);

  // let the magic happen :–)
  persistStore(store, { blacklist: ['progress', 'routing', 'notifications', 'firebase', 'auth'], storage }); // .purge() // in case you want to purge the store

  return store;
};

export default configureStore({
  initialState: {},
  platformDeps: {},
  platformEpics: [],
  platformReducers: {},
});
