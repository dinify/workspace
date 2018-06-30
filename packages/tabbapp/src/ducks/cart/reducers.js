// @flow
import R from 'ramda';
import * as FN from 'lib/FN';
import types from './types';

const initialState = {
  items: {},
  subtotal: {
    amount: 0,
    currency: "KWD",
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TO_CART_DONE: {
      return state;
    }
    case types.FETCH_CART_DONE: {
      const res = action.payload.res;
      if (res.status && res.status === 'successful') {
        return initialState;
      }
      let newState = state;
      R.keys(res).forEach((key) => {
        if (key === 'subtotal') {
          newState = R.assoc('subtotal', res.subtotal)(newState)
        } else {
          newState = R.assoc('items', {})(newState);
          const restaurantId = key;
          R.keys(res[restaurantId]).forEach((itemId) => {
            if (itemId !== 'subtotal' && itemId !== 'id') {
              newState = R.assocPath(['items', itemId], res[restaurantId][itemId])(newState);
            }
          })
        }
      })
      return newState;
    }

    default:
      return state;
  }
}
