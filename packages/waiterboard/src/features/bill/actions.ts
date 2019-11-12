import { createAsyncAction, createStandardAction } from 'typesafe-actions';

const p = 'dinify/bill';

export const billReceivedAction = createStandardAction(`${p}/BILL_RECEIVED`)<any>();

export const fetchBillsAsync = createAsyncAction(
  `${p}/GET_BILLS_INIT`,
  `${p}/GET_BILLS_DONE`,
  `${p}/GET_BILLS_FAIL`,
)<undefined, any, any>();

export const confirmBillAsync = createAsyncAction(
  `${p}/CONFIRM_BILL_INIT`,
  `${p}/CONFIRM_BILL_DONE`,
  `${p}/CONFIRM_BILL_FAIL`,
)<any, any, any>();
