import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import auth from '@dinify/common/src/ducks/auth/reducers';
import ui from '../ducks/ui/reducers';
import user from '../ducks/user/reducers';
import restaurant from '../ducks/restaurant/reducers';
import menuCategory from '../ducks/menuCategory/reducers';
import menuItem from '../ducks/menuItem/reducers';
import booking from '../ducks/booking/reducers';
import cart from '../ducks/cart/reducers';
import transaction from '../ducks/transaction/reducers';
import service from '../ducks/service/reducers';
import seat from '../ducks/seat/reducers';
import ingredient from '../ducks/ingredient/reducers';
import addon from '../ducks/addon/reducers';
import option from '../ducks/option/reducers';

const snackbarReducer = require('material-ui-snackbar-redux').snackbarReducer;

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

const servicePersistConfig = {
  key: 'service',
  storage,
  whitelist: ['all']
}

export const commonReducers = {
  auth,
  ui,
  user,
  restaurant: persistReducer(restaurantPersistConfig, restaurant),
  menuCategory: persistReducer(menuCategoryPersistConfig, menuCategory),
  menuItem: persistReducer(menuItemPersistConfig, menuItem),
  booking,
  cart,
  transaction,
  service: persistReducer(servicePersistConfig, service),
  seat,
  snackbar: snackbarReducer,
  firebase: firebaseReducer,
  form: formReducer,
  ingredient,
  addon,
  option
};

const rootReducer = combineReducers(commonReducers);

export default rootReducer;