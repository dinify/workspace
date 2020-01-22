import * as actions from './actions';
import { createReducer, createAction } from 'typesafe-actions';
import { combineReducers } from 'redux';
import {
  OrderItemNMap,
  OrderAddonMap, Subtotal, OrderItemN } from 'CartModels';
import dissoc from 'ramda/es/dissoc';
import mapObjIndexed from 'ramda/es/mapObjIndexed';
import { actionTypes as fActionTypes } from 'react-redux-firebase';

export const resetActions = [
  actions.fetchCartAsync.failure,
  createAction(fActionTypes.LOGOUT)<any>(),
  actions.makeCartDoneAsync.success
];

const identity = (o: any) => !!o && o !== 'pivotUndefined';

export const items = createReducer({} as OrderItemNMap)
  .handleAction(actions.fetchCartAsync.success, (state, action) => {
    const orderItems: OrderItemNMap = mapObjIndexed((orderItem: OrderItemN) => {
      
      const { orderAddons, orderExcludes, orderChoices } = orderItem;
      return {
        ...orderItem,
        orderAddons: orderAddons.filter(identity),
        orderExcludes: orderExcludes.filter(identity),
        orderChoices: orderChoices.filter(identity)
      };
    }, action.payload.entities.orderItems);
    return orderItems;
  })
  .handleAction(actions.rmFromCartAsync.request, (state, action) => {
    const { orderItemId } = action.payload;
    return dissoc(orderItemId)(state);
  })
  .handleAction(actions.addToCartAsync.success, (state, action) => {
    const orderItem = action.payload;
    return { ...state, [orderItem.id]: orderItem };
  })
  .handleAction(resetActions, () => ({}));


export const orderAddons = createReducer({} as OrderAddonMap)
  .handleAction(
    actions.fetchCartAsync.success,
    (state, action) => action.payload.entities.orderAddons
  )
  .handleAction(resetActions, () => ({}));


const defaultSubtotal: Subtotal = {
  amount: 0,
  currency: 'CZK',
  precision: 2
}
export const subtotal = createReducer(defaultSubtotal as Subtotal)

  .handleAction(actions.fetchCartAsync.success, (state, action) => 
    action.payload.result.subtotal
  )
  .handleAction(resetActions, () => defaultSubtotal);

  
export const guestsCart = createReducer(null as any)

  .handleAction(actions.fetchUserCartAsync.success, (state, action) =>
    action.payload
  )
  .handleAction(actions.makeCartDoneAsync.success, (state, action) =>
    ({
      ...state,
      done: true
    })
  )

const cartReducer = combineReducers({
  items,
  orderAddons,
  subtotal,
  guestsCart
});

export default cartReducer;
export type CartState = ReturnType<typeof cartReducer>;
