import types from './types';

export const fetchBillInit = () => ({
  type: types.FETCH_BILL_INIT,
})

export const fetchBillFail = (e) => ({
  type: types.FETCH_BILL_FAIL,
  payload: e
})

export const fetchReceiptInit = () => ({
  type: types.FETCH_RECEIPT_INIT,
})

export const fetchReceiptFail = (e) => ({
  type: types.FETCH_RECEIPT_FAIL,
  payload: e
})

export const selectBillItem = ({ selected, seatIndex, billItemIndex }) => ({
  type: types.SELECT_BILLITEM,
  payload: { selected, seatIndex, billItemIndex  }
})

export const setGratitude = ({ percentage }) => ({
  type: types.SET_GRATITUDE,
  payload: { percentage }
})

export const splitBillInit = ({ orderItems, withIds }) => ({
  type: types.SPLIT_BILL_INIT,
  payload: { orderItems, withIds }
})

export const splitBillDone = (res) => ({
  type: types.SPLIT_BILL_DONE,
  payload: res
})

export const transferBillInit = ({ itemId, userId }) => ({
  type: types.TRANSFER_BILL_INIT,
  payload: { itemId, userId }
})

export const transferBillDone = (res) => ({
  type: types.TRANSFER_BILL_DONE,
  payload: res
})

export const initTransactionInit = ({ type, gratuity }) => ({
  type: types.INIT_TRANSACTION_INIT,
  payload: { type, gratuity }
})

export const initTransactionDone = (res) => ({
  type: types.INIT_TRANSACTION_DONE,
  payload: res
})

