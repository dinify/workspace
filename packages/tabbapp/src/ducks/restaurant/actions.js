import types from './types';

export const fetchRestaurantsInit = () => ({
  type: types.FETCH_RESTAURANTS_INIT,
});

export const fetchStatusInit = () => ({
  type: types.FETCH_STATUS_INIT,
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
