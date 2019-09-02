import {
  CartResponse,
  AddToCartRequest,
  RmFromCartRequest,
  OrderRequest,
  OrderResponse
} from 'CartModels';
import {
  createAction,
  createAsyncAction
} from 'typesafe-actions';

const p = 'dinify/cart';

export const fetchCartAsync = createAsyncAction(
  `${p}/FETCH_CART_INIT`,
  `${p}/FETCH_CART_DONE`,
  `${p}/FETCH_CART_FAIL`
)<undefined, CartResponse, string>();

export const addToCartAsync = createAsyncAction(
  `${p}/ADD_TO_CART_INIT`,
  `${p}/ADD_TO_CART_DONE`,
  `${p}/ADD_TO_CART_FAIL`
)<AddToCartRequest, CartResponse, string>();

export const rmFromCartAsync = createAsyncAction(
  `${p}/REMOVE_ORDERITEM_INIT`,
  `${p}/REMOVE_ORDERITEM_DONE`,
  `${p}/REMOVE_ORDERITEM_FAIL`
)<RmFromCartRequest, CartResponse, string>();


export const orderAsync = createAsyncAction(
  `${p}/ORDER_INIT`, // items
  `${p}/ORDER_DONE`, // res
  `${p}/ORDER_FAIL`
)<OrderRequest, OrderResponse, string>();


export const setOrderTypeAction = createAction(`${p}/SET_ORDERTYPE`, action => {
  return (orderType: string) => action(orderType);
});
