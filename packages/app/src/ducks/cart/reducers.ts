import * as actions from './actions';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import {
  OrderItemNMap,
  OrderAddonMap, Subtotal, OrderItemN } from 'CartModels';
import dissoc from 'ramda/es/dissoc';
import mapObjIndexed from 'ramda/es/mapObjIndexed';

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
  .handleAction(actions.fetchCartAsync.failure, () => {
    return {};
  })
  .handleAction(actions.rmFromCartAsync.request, (state, action) => {
    const { orderItemId } = action.payload;
    return dissoc(orderItemId)(state);
  })
  .handleAction(actions.addToCartAsync.success, (state, action) => {
    const orderItem = action.payload;
    return { ...state, [orderItem.id]: orderItem };
  });

export const orderAddons = createReducer({} as OrderAddonMap)
  .handleAction(actions.fetchCartAsync.success, (state, action) => {
    state;
    return action.payload.entities.orderAddons;
  })
  .handleAction(actions.fetchCartAsync.failure, () => {
    return {};
  });

const defaultSubtotal: Subtotal = {
  amount: 0,
  currency: 'CZK',
  precision: 2
}

export const subtotal = createReducer(defaultSubtotal as Subtotal)

  .handleAction(actions.fetchCartAsync.failure, () => {
    return defaultSubtotal;
  })

  .handleAction(actions.fetchCartAsync.success, (state, action) => {
    state;
    return action.payload.result.subtotal;
  });

const cartReducer = combineReducers({
  items,
  orderAddons,
  subtotal
});

export default cartReducer;
export type CartState = ReturnType<typeof cartReducer>;
