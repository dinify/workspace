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
      const menuItem = action.payload.menu_item;
      return R.assocPath(['items', menuItem.id], menuItem)(state);
    }
    case types.FETCH_CART_DONE: {
      const res = action.payload.res;
      if (res.status && res.status === 'successful') {
        return initialState;
      }
      let newState = state;
      newState = R.assoc('items', {})(newState);
      R.keys(res).forEach((key) => {
        if (key === 'subtotal') {
          newState = R.assoc('subtotal', res.subtotal)(newState)
        } else {
          R.keys(res[key]).forEach((itemId) => {
            if (itemId !== 'subtotal' && itemId !== 'id') {
              newState = R.assocPath(['items', itemId], res[key][itemId])(newState);
            }
          })
        }
      })
      return newState;
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
