import * as types from './types';

export const fetchTodayBills = (payload) => ({
  type: types.FETCH_TODAYBILLS_INIT,
  payload
});

export const confirmCallInit = (payload) => ({
  type: types.BILL_CONFIRMATION_INIT,
  payload
});
