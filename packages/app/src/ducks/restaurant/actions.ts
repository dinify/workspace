import { Restaurant, Status, FavRestaurantRequest, FavRestaurantResponse } from 'RestaurantModels';
import { createStandardAction, createAsyncAction } from 'typesafe-actions';

const p = 'dinify/restaurant';

export const fetchRestaurantsAsync = createAsyncAction(
  `${p}/FETCH_RESTAURANTS_INIT`, // { populateWith: `images` }
  `${p}/FETCH_RESTAURANTS_DONE`,
  `${p}/FETCH_RESTAURANTS_FAIL`
)<undefined, Restaurant[], string>();

export const fetchRestaurantAsync = createAsyncAction(
  `${p}/FETCH_RESTAURANT_INIT`,
  `${p}/FETCH_RESTAURANT_DONE`,
  `${p}/FETCH_RESTAURANT_FAIL`
)<undefined, Restaurant, string>();

export const fetchStatusAsync = createAsyncAction(
  `${p}/FETCH_STATUS_INIT`,
  `${p}/FETCH_STATUS_DONE`,
  `${p}/FETCH_STATUS_FAIL`
)<undefined, Status, string>();

export const checkinAsync = createAsyncAction(
  `${p}/CHECKIN_INIT`,
  `${p}/CHECKIN_DONE`,
  `${p}/CHECKIN_FAIL`
)<undefined, object, [object]>();

export const favRestaurantAsync = createAsyncAction(
  `${p}/FAV_RESTAURANT_INIT`, // { fav, id }
  `${p}/FAV_RESTAURANT_DONE`, // { res, initPayload }
  `${p}/FAV_RESTAURANT_FAIL` // { error, initPayload }
)<FavRestaurantRequest, FavRestaurantResponse, string>();
