import * as types from './types';

export const fetchTodayBills = (payload) => ({
  type: types.FETCH_TODAYBILLS_INIT,
  payload
});
