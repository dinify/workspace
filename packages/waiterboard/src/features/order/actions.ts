import { createAsyncAction, createAction } from 'typesafe-actions';

const p = 'dinify/order';

export const orderReceivedAction = createAction(`${p}/ORDER_RECEIVED`)<any>();

export const fetchOrdersAsync = createAsyncAction(
  `${p}/GET_ORDERS_INIT`,
  `${p}/GET_ORDERS_DONE`,
  `${p}/GET_ORDERS_FAIL`,
)<undefined, any, any>();

export const confirmOrderAsync = createAsyncAction(
  `${p}/CONFIRM_ORDER_INIT`,
  `${p}/CONFIRM_ORDER_DONE`,
  `${p}/CONFIRM_ORDER_FAIL`,
)<any, any, any>();
