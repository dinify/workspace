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
import routerReducer from '../ducks/routing/reducer';
import { LanguageIdType, RegionIdType, CurrencyType } from '@phensley/cldr';

const restaurantPersistConfig = {
  key: 'restaurant',
  storage,
  whitelist: ['checkinPlan']
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

const uiPersistConfig = {
  key: 'ui',
  storage,
  whitelist: ['theme']
}

export interface Profile {
  language: {
    primary: LanguageIdType,
    other: LanguageIdType[]
  },
  region: RegionIdType,
  displayCurrency: CurrencyType
}

const firebaseReducerWrapper = (state: any, action: any) => firebaseReducer<Partial<Profile>>(state, action);

export const commonReducers = {
  auth,
  ui: persistReducer(uiPersistConfig, ui),
  user,
  restaurant: persistReducer(restaurantPersistConfig, restaurant),
  menuCategory: persistReducer(menuCategoryPersistConfig, menuCategory),
  menuItem: persistReducer(menuItemPersistConfig, menuItem),
  booking,
  cart,
  transaction,
  service: persistReducer(servicePersistConfig, service),
  seat,
  firebase: firebaseReducerWrapper,
  form: formReducer,
  ingredient,
  addon,
  option,
  routing: routerReducer
};

const rootReducer = combineReducers(commonReducers);

export default rootReducer;