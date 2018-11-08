// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  orderType: 'DINE_IN', // AHEAD, TAKEAWAY
  restaurants: {},
  subtotal: {
    amount: 0,
    currency: "KWD",
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case types.ADD_TO_CART_DONE: {
    //   const res = action.payload;
    //   return R.assocPath(['items', res.id], res)(state);
    // }
    case types.ORDER_DONE: {
      return R.assoc('restaurants', {})(state);
    }
    case types.SET_ORDERTYPE: {
      return R.assoc('orderType', action.payload.orderType)(state);
    }
    case types.REMOVE_ORDERITEM_INIT: {
      const { orderItemId } = action.payload;
      const amount = state.subtotal.amount;
      const itemAmount = state.items[orderItemId].subtotal.amount;
      return R.assocPath(['subtotal','amount'], amount - itemAmount)(
        R.dissocPath(['items', orderItemId])(state)
      );
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
