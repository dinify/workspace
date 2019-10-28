import {
  StatusResponse,
  FavRestaurantRequest,
  FavRestaurantResponse,
  RestaurantResponse,
  RestaurantsResponse,
  FavRestaurantError
} from 'RestaurantModels';
import { createAsyncAction, createAction } from 'typesafe-actions';

const p = 'dinify/restaurant';

export const fetchRestaurantsAsync = createAsyncAction(
  `${p}/GET_RESTAURANTS_INIT`, // { populateWith: `images` }
  `${p}/GET_RESTAURANTS_DONE`,
  `${p}/GET_RESTAURANTS_FAIL`
)<undefined, RestaurantsResponse, string>();

export const fetchRestaurantAsync = createAsyncAction(
  `${p}/FETCH_RESTAURANT_INIT`,
  `${p}/FETCH_RESTAURANT_DONE`,
  `${p}/FETCH_RESTAURANT_FAIL`
)<undefined, RestaurantResponse, string>();

export const fetchStatusAsync = createAsyncAction(
  `${p}/GET_STATUS_INIT`,
  `${p}/GET_STATUS_DONE`,
  `${p}/GET_STATUS_FAIL`
)<undefined, StatusResponse, string>();

type PlanCheckinPayload = {
  qr: string;
  pathname: string;
}

export const planCheckinAction = createAction(
  `${p}/PLAN_CHECKIN`,
  action => (payload: PlanCheckinPayload) => action({
    createdAt: Date.now(),
    ...payload
  })
);

export const execCheckinAsync = createAsyncAction(
  `${p}/CHECKIN_INIT`,
  `${p}/CHECKIN_DONE`,
  `${p}/CHECKIN_FAIL`
)<undefined, object, any>();

export const favRestaurantAsync = createAsyncAction(
  `${p}/FAV_RESTAURANT_INIT`, // { fav, id }
  `${p}/FAV_RESTAURANT_DONE`, // { res, initPayload }
  `${p}/FAV_RESTAURANT_FAIL` // { error, initPayload }
)<FavRestaurantRequest, FavRestaurantResponse, FavRestaurantError>();
