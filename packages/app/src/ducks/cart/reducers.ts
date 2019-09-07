// import assocPath from 'ramda/src/assocPath';
import * as actions from './actions';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { OrderItemMap, OrderItem, Subtotal } from 'CartModels';
import dissoc from 'ramda/src/dissoc';

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


export const items = createReducer({} as OrderItemMap)

  .handleAction(actions.fetchCartAsync.success, (state, action) => {
    state;
    return action.payload.entities.orderItems;
  })

  .handleAction(actions.addToCartAsync.request, (state, action) => {
    return state;
  })

  .handleAction(actions.rmFromCartAsync.request, (state, action) => {
    const { orderItemId } = action.payload;
    return dissoc(orderItemId)(state);
  })

  .handleAction(actions.addToCartAsync.success, (state, action) => {
    const orderItem = action.payload;
    return { ...state, [orderItem.id]: orderItem };
  });

export const orderAddons = createReducer({} as OrderItemMap)

  .handleAction(actions.fetchCartAsync.success, (state, action) => {
    state;
    return action.payload.entities.orderAddons;
  });

const defaultSubtotal: Subtotal = {
  amount: 0,
  currency: 'EUR',
  precision: 2
}

export const subtotal = createReducer(defaultSubtotal as Subtotal)

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
