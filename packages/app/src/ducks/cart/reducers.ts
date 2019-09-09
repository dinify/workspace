// import assocPath from 'ramda/src/assocPath';
import * as actions from './actions';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import {
  OrderItemNMap,
  OrderAddonMap, Subtotal, OrderItemN } from 'CartModels';
import dissoc from 'ramda/src/dissoc';
import mapObjIndexed from 'ramda/src/mapObjIndexed';

// case types.ADD_TO_CART_DONE: {
//   const res = action.payload;
//   return R.assocPath(['items', res.id], res)(state);
// }
// case types.FETCH_CART_DONE: {
//  const res = action.payload.res;
//  if (res.status && res.status === 'successful') {
//    return initialState;
//  }
//  let newState = state;
//  newState = R.assoc('items', {})(newState);
//  R.keys(res).forEach((key) => {
//    if (key === 'subtotal') {
//      newState = R.assoc('subtotal', res.subtotal)(newState)
//    } else {
//      R.keys(res[key]).forEach((itemId) => {
//        if (itemId !== 'subtotal' && itemId !== 'id') {
//          newState = R.assocPath(['items', itemId], res[key][itemId])(newState);
//        }
//      })
//    }
//  })
//  return newState;
// }

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

  // .handleAction(actions.addToCartAsync.request, (state) => {
  //   return state;
  // })

  .handleAction(actions.rmFromCartAsync.request, (state, action) => {
    const { orderItemId } = action.payload;
    return dissoc(orderItemId)(state);
  })

  .handleAction(actions.addToCartAsync.success, (state, action) => {
    const orderItem = action.payload;
    return { ...state, [orderItem.id]: orderItem };
  });

export const orderAddons = createReducer({} as OrderAddonMap)

  .handleAction(actions.fetchCartAsync.failure, () => {
    return {};
  })

  .handleAction(actions.fetchCartAsync.success, (state, action) => {
    state;
    return action.payload.entities.orderAddons;
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
