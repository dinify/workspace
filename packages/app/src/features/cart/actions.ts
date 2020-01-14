import {
  CartResponse,
  AddToCartRequest,
  RmFromCartRequest,
  OrderResponse,
  CartResponseN,
  AddToCartResponseN,
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
)<undefined, CartResponse, string>();

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

export const orderAsync = createAsyncAction(
  `${p}/ORDER_INIT`, // items
  `${p}/ORDER_DONE`, // res
  `${p}/ORDER_FAIL`,
)<undefined, OrderResponse, string>();
