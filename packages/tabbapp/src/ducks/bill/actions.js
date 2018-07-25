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

export const splitBillInit = ({ itemId, userIds }) => ({
  type: types.SPLIT_BILL_INIT,
  payload: { itemId, userIds }
})

export const splitBillDone = (res) => ({
  type: types.SPLIT_BILL_DONE,
  payload: res
})

export const splitBillFail = (e) => ({
  type: types.SPLIT_BILL_FAIL,
  payload: e
})

export const transferBillInit = ({ itemId, userId }) => ({
  type: types.TRANSFER_BILL_INIT,
  payload: { itemId, userId }
})

export const transferBillDone = (res) => ({
  type: types.TRANSFER_BILL_DONE,
  payload: res
})

export const transferBillFail = (e) => ({
  type: types.TRANSFER_BILL_FAIL,
  payload: e
})

export const initTransactionInit = ({ type, gratuity }) => ({
  type: types.INIT_TRANSACTION_INIT,
  payload: { type, gratuity }
})

export const initTransactionDone = (res) => ({
  type: types.INIT_TRANSACTION_DONE,
  payload: res
})

export const initTransactionFail = (e) => ({
  type: types.INIT_TRANSACTION_FAIL,
  payload: e
})
