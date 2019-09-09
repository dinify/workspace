import { createAsyncAction } from 'typesafe-actions';
import {
  InitTransactionRequest,
  InitTransactionResponse
} from 'TransactionModels';

const p = 'dinify/transaction';

export const initTransactionAsync = createAsyncAction(
  `${p}/INIT_TRANSACTION_INIT`, // { populateWith: `images` }
  `${p}/INIT_TRANSACTION_DONE`,
  `${p}/INIT_TRANSACTION_FAIL`
)<InitTransactionRequest, InitTransactionResponse, string>();


export const fetchBillInit = () => ({
  type: `${p}/FETCH_BILL_INIT`,
})

export const fetchBillFail = (e: any) => ({
  type: `${p}/FETCH_BILL_FAIL`,
  payload: e
})

export const fetchReceiptInit = () => ({
  type: `${p}/FETCH_RECEIPT_INIT`,
})

export const fetchReceiptFail = (e: any) => ({
  type: `${p}/FETCH_RECEIPT_FAIL`,
  payload: e
})

export const selectBillItem = ({ selected, seatIndex, billItemIndex }: any) => ({
  type: `${p}/SELECT_BILLITEM`,
  payload: { selected, seatIndex, billItemIndex  }
})

export const setGratitude = ({ percentage }: any) => ({
  type: `${p}/SET_GRATITUDE`,
  payload: { percentage }
})

export const splitBillInit = ({ orderItems, withIds }: any) => ({
  type: `${p}/SPLIT_BILL_INIT`,
  payload: { orderItems, withIds }
})

export const splitBillDone = (res: any) => ({
  type: `${p}/SPLIT_BILL_DONE`,
  payload: res
})

export const transferBillInit = ({ itemId, userId }: any) => ({
  type: `${p}/TRANSFER_BILL_INIT`,
  payload: { itemId, userId }
})

export const transferBillDone = (res: any) => ({
  type: `${p}/TRANSFER_BILL_DONE`,
  payload: res
})

export const initTransactionInit = ({ type, gratuity }: any) => ({
  type: `${p}/INIT_TRANSACTION_INIT`,
  payload: { type, gratuity }
})

export const initTransactionDone = (res: any) => ({
  type: `${p}/INIT_TRANSACTION_DONE`,
  payload: res
})

