import types from './types';

export const fetchSeatsInit = () => ({
  type: types.FETCH_SEATS_INIT,
})

export const fetchSeatsFail = (e) => ({
  type: types.FETCH_SEATS_FAIL,
  payload: e
})
