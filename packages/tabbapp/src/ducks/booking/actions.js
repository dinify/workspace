import types from './types';

export const setTimeInit = (payload) => ({
  type: types.SET_TIME,
  payload
});

export const setGuestsInit = (payload) => ({
  type: types.SET_GUESTS,
  payload
});

export const setDateInit = (payload) => ({
  type: types.SET_DATE,
  payload
});
