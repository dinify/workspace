import {
  CartResponse,
  AddToCartRequest,
  RmFromCartRequest,
  OrderRequest,
  OrderResponse,
  CartResponseNormalized
} from 'CartModels';
import {
  createAction,
  createAsyncAction
} from 'typesafe-actions';

const p = 'dinify/cart';

export const fetchCartAsync = createAsyncAction(
  `${p}/GET_CART_INIT`,
  `${p}/GET_CART_DONE`,
  `${p}/GET_CART_FAIL`
)<undefined, CartResponseNormalized, string>();

export const addToCartAsync = createAsyncAction(
  `${p}/ADD_TO_CART_INIT`,
  `${p}/ADD_TO_CART_DONE`,
  `${p}/ADD_TO_CART_FAIL`
)<AddToCartRequest, any, string>();

export const rmFromCartAsync = createAsyncAction(
  `${p}/RM_FROM_CART_INIT`,
  `${p}/RM_FROM_CART_DONE`,
  `${p}/RM_FROM_CART_FAIL`
)<RmFromCartRequest, CartResponse, string>();

export const orderAsync = createAsyncAction(
  `${p}/ORDER_INIT`, // items
  `${p}/ORDER_DONE`, // res
  `${p}/ORDER_FAIL`
)<OrderRequest, OrderResponse, string>();

export const setOrderTypeAction = createAction(`${p}/SET_ORDERTYPE`, action => {
  return (orderType: string) => action(orderType);
});
