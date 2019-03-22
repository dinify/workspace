// @flow
import * as R from 'ramda';
import types from './types';

const initialState = {
  orderType: 'DINE_IN', // AHEAD, TAKEAWAY
  cart: {
    count: 0
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
    case types.FETCH_CART_DONE: {
      return R.assocPath(['cart'], action.payload)(state);
    }
    case types.FETCH_CART_FAIL: {
      const payload = action.payload;
      if (payload instanceof Array && payload[0].status === 401) {
        return initialState;
      }
      return state;
    }
    default:
      return state;
  }
}
