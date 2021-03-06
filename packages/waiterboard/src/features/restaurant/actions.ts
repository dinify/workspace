import { createAsyncAction } from 'typesafe-actions';

const p = 'dinify/restaurant';

export const fetchManagedAsync = createAsyncAction(
  `${p}/GET_MANAGED_INIT`,
  `${p}/GET_MANAGED_DONE`,
  `${p}/GET_MANAGED_FAIL`,
)<undefined, any, any>();

export const fetchRestaurantAsync = createAsyncAction(
  `${p}/GET_RESTAURANT_INIT`,
  `${p}/GET_RESTAURANT_DONE`,
  `${p}/GET_RESTAURANT_FAIL`,
)<undefined, any, any>();
