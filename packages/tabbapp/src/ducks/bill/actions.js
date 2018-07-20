import types from './types';

export const fetchBillInit = () => ({
  type: types.FETCH_BILL_INIT,
})

export const fetchBillFail = (e) => ({
  type: types.FETCH_BILL_FAIL,
  payload: e
})
