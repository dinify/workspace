import { createAsyncAction } from 'typesafe-actions';

const p = 'dinify/table';

export const checkoutUserAsync = createAsyncAction(
  `${p}/CHECKOUT_USER_INIT`,
  `${p}/CHECKOUT_USER_DONE`,
  `${p}/CHECKOUT_USER_FAIL`,
  `${p}/CHECKOUT_USER_CANCEL`,
)<any, any, any, any>();

export const checkoutTableAsync = createAsyncAction(
  `${p}/CHECKOUT_TABLE_INIT`,
  `${p}/CHECKOUT_TABLE_DONE`,
  `${p}/CHECKOUT_TABLE_FAIL`,
  `${p}/CHECKOUT_TABLE_CANCEL`,
)<any, any, any, any>();

type UpdateTable = {
  id: string;
  offline: boolean;
}

export const updateTableAsync = createAsyncAction(
  `${p}/UPD_TABLE_INIT`,
  `${p}/UPD_TABLE_DONE`,
  `${p}/UPD_TABLE_FAIL`,
)<UpdateTable, any, any>();
