import {
  CartResponse,
  AddToCartRequest,
  RmFromCartRequest,
  OrderResponse,
  CartResponseN,
  AddToCartResponseN,
  MarkCartDoneRequest,
} from 'CartModels';
import { createAsyncAction } from 'typesafe-actions';

const p = 'dinify/cart';

export const fetchCartAsync = createAsyncAction(
  `${p}/GET_CART_INIT`,
  `${p}/GET_CART_DONE`,
  `${p}/GET_CART_FAIL`,
  `${p}/GET_CART_CANCEL`,
)<undefined, CartResponseN, string>();

export const fetchUserCartAsync = createAsyncAction(
  `${p}/GET_USERCART_INIT`,
  `${p}/GET_USERCART_DONE`,
  `${p}/GET_USERCART_FAIL`,
  `${p}/GET_USERCART_CANCEL`,
)<any, CartResponse, string>();

export const makeCartDoneAsync = createAsyncAction(
  `${p}/MAKECARTDONE_INIT`,
  `${p}/MAKECARTDONE_DONE`,
  `${p}/MAKECARTDONE_FAIL`,
  `${p}/MAKECARTDONE_CANCEL`,
)<MarkCartDoneRequest, any, string>();

export const addToCartAsync = createAsyncAction(
  `${p}/ADD_TO_CART_INIT`,
  `${p}/ADD_TO_CART_DONE`,
  `${p}/ADD_TO_CART_FAIL`,
)<Partial<AddToCartRequest>, AddToCartResponseN, string>();

export const rmFromCartAsync = createAsyncAction(
  `${p}/RM_FROM_CART_INIT`,
  `${p}/RM_FROM_CART_DONE`,
  `${p}/RM_FROM_CART_FAIL`,
)<RmFromCartRequest, CartResponse, string>();

export const clearCartAsync = createAsyncAction(
  `${p}/CLEAR_CART_INIT`,
  `${p}/CLEAR_CART_DONE`,
  `${p}/CLEAR_CART_FAIL`,
  `${p}/CLEAR_CART_CANCEL`,
)<void, any, string>();

export const orderAsync = createAsyncAction(
  `${p}/ORDER_INIT`, // items
  `${p}/ORDER_DONE`, // res
  `${p}/ORDER_FAIL`,
)<undefined, OrderResponse, string>();
