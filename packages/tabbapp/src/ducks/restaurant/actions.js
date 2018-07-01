import types from './types';

export const fetchRestaurantsInit = () => ({
  type: types.FETCH_RESTAURANTS_INIT,
});

export const fetchRestaurantInit = (payload) => ({
  type: types.FETCH_RESTAURANT_INIT,
  payload
});

export const fetchStatusInit = () => ({
  type: types.FETCH_STATUS_INIT,
});

export const fetchStatusFail = (e) => ({
  type: types.FETCH_STATUS_FAIL,
  payload: e
});

export const checkinInit = (payload) => ({
  type: types.CHECKIN_INIT,
  payload
});

export const checkinDone = (res) => ({
  type: types.CHECKIN_DONE,
  payload: res
});

export const checkinFail = (e) => ({
  type: types.CHECKIN_FAIL,
  payload: e
});

export const favRestaurantInit = ({ fav, id }) => ({
  type: types.FAV_RESTAURANT_INIT,
  payload: { fav, id }
});

export const favRestaurantDone = ({ res, prePayload }) => ({
  type: types.FAV_RESTAURANT_DONE,
  payload: { res, prePayload }
});

export const favRestaurantFail = ({ error, prePayload }) => ({
  type: types.FAV_RESTAURANT_FAIL,
  payload: { error, prePayload }
});
