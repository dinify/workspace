import { createAsyncAction } from 'typesafe-actions';
import * as types from './types';

const p = 'dinify/restaurant';

export const fetchRestaurantAsync = createAsyncAction(
  `${p}/GET_RESTAURANT_INIT`, // { populateWith: `images` }
  `${p}/GET_RESTAURANT_DONE`,
  `${p}/GET_RESTAURANT_FAIL`
)();

export const fetchManagedAsync = createAsyncAction(
  `${p}/GET_MANAGED_INIT`,
  `${p}/GET_MANAGED_DONE`,
  `${p}/GET_MANAGED_FAIL`,
)();

export const updateRestaurantAsync = createAsyncAction(
  `${p}/UPD_RESTAURANT_INIT`,
  `${p}/UPD_RESTAURANT_DONE`,
  `${p}/UPD_RESTAURANT_FAIL`,
)();

export const fetchWaiterboardsAsync = createAsyncAction(
  `${p}/GET_WAITERBOARDS_INIT`,
  `${p}/GET_WAITERBOARDS_DONE`,
  `${p}/GET_WAITERBOARDS_FAIL`,
)();

export const selectCategoryAction = payload => ({
  type: 'SELECT_CATEGORY',
  payload,
});
export const registerRestaurant = payload => ({
  type: 'REGISTER_RESTAURANT_INIT',
  payload
})
export const setOnboardingToken = ({ token }) => ({
  type: 'SET_ONBOARDINGTOKEN',
  payload: { token }
});
export const prefillEmail = payload => ({ type: 'PREFILL_EMAIL', payload });
export const prefillRestaurantName = payload => ({ type: 'PREFILL_RESTAURANTNAME', payload });
export const setOngoingRegistration = payload => ({ type: 'SET_ONGOINGREGISTRATION', payload })
export const selectFoodAction = payload => ({ type: 'SELECT_FOOD', payload });
export const signupInitAction = payload => ({ type: 'SIGNUP_INIT', payload });
export const appBootstrap = () => ({ type: 'BOOTSTRAP' });

export const createWaiterboardInitAction = payload => ({
  type: 'CREATE_WAITERBOARD_INIT',
  payload,
});
export const deleteWaiterboardInitAction = payload => ({
  type: 'REMOVE_WAITERBOARD_INIT',
  payload,
});

export const createTableInitAction = payload => ({
  type: 'CREATE_TABLE_INIT',
  payload,
});
export const updateTableInitAction = payload => ({
  type: 'UPDATE_TABLE_INIT',
  payload,
});
export const deleteTableInitAction = payload => ({
  type: 'REMOVE_TABLE_INIT',
  payload,
});

export const uploadMainImageInitAction = payload => ({
  type: 'UPDATE_IMAGE_INIT',
  payload,
});

export const updateFoodNutritionInit = payload => ({
  type: 'UPDATE_NUTRITION_INIT',
  payload,
});

export const selectRestaurant = ({ id }) => ({ type: 'SELECT_RESTAURANT', payload: { id } });

export const publishRestaurant = () => ({
  type: types.SEND_PUBLISHREQUEST_INIT
});

export const updateWifiInitAction = (payload) => ({
  type: 'UPD_WIFI_INIT',
  payload
});
