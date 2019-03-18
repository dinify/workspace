import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import { snackbarReducer } from 'material-ui-snackbar-redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
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
import rootEpic from './configureEpics';


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
  apiKey: "AIzaSyCRg0En-xj3Ky02oElBV3HogOCZlPEdd30",
  authDomain: "m.dinify.app",
  databaseURL: "https://tabb-global.firebaseio.com",
  projectId: "tabb-global",
  storageBucket: "tabb-global.appspot.com",
  messagingSenderId: "448538111630"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'profiles',
  updateProfileOnLogin: true,
  useFirestoreForProfile: true,
  profileFactory: (userData, profileData) => {
    // make sure default profile values are populated
    return {
      ...profileData,
      language: {
        primary: navigator.language,
        other: [],
        ...profileData.language
      }
    };
  }
}
firebase.initializeApp(firebaseConfig)

const configureStore = (options, storage) => {
  const {
    initialState,
    platformReducers = {},
  } = options;

  const reducers = combineReducers({
    form: formReducer,
    ...commonReducers,
    ...platformReducers,
  });

  const epicMiddleware = createEpicMiddleware();

  const middlewares = [
    epicMiddleware
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

  epicMiddleware.run(rootEpic);

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
