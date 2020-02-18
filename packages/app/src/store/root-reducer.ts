import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import auth from '@dinify/common/src/features/auth/reducers';
import ui from 'features/ui/reducers';
import user from 'features/user/reducers';
import restaurant from 'features/restaurant/reducers';
import menuCategory from 'features/menuCategory/reducers';
import menuItem from 'features/menuItem/reducers';
import booking from 'features/booking/reducers';
import cart from 'features/cart/reducers';
import transaction from 'features/transaction/reducers';
import service from 'features/service/reducers';
import ingredient from 'features/ingredient/reducers';
import addon from 'features/addon/reducers';
import option from 'features/option/reducers';
import router from 'features/router/reducer';
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

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['geolocation']
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
  user: persistReducer(userPersistConfig, user),
  restaurant: persistReducer(restaurantPersistConfig, restaurant),
  menuCategory: persistReducer(menuCategoryPersistConfig, menuCategory),
  menuItem: persistReducer(menuItemPersistConfig, menuItem),
  booking,
  cart,
  transaction,
  service: persistReducer(servicePersistConfig, service),
  firebase: firebaseReducerWrapper,
  form: formReducer,
  ingredient,
  addon,
  option,
  router
};

const rootReducer = combineReducers(commonReducers);

export default rootReducer;