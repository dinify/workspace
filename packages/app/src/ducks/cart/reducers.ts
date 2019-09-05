// import assocPath from 'ramda/src/assocPath';
import * as actions from './actions';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { Cart } from 'CartModels';

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

export const cart = createReducer(null as Cart | null)

  .handleAction(actions.fetchCartAsync.success, (state, action) => {
    state;
    return action.payload;
  })

  .handleAction(actions.addToCartAsync.request, (state) => {
    return state;
  })

  .handleAction(actions.addToCartAsync.success, (state) => {
    return state;
  });

const cartReducer = combineReducers({
  cart
});

export default cartReducer;
export type CartState = ReturnType<typeof cartReducer>;
