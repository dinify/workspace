import types from './types';

export const fetchBillInit = () => ({
  type: types.FETCH_BILL_INIT,
})

export const fetchBillFail = (e) => ({
  type: types.FETCH_BILL_FAIL,
  payload: e
})

export const selectBillItem = ({ index, selected }) => ({
  type: types.SELECT_BILLITEM,
  payload: { index, selected }
})

export const setGratitude = ({ percentage }) => ({
  type: types.SET_GRATITUDE,
  payload: { percentage }
})
