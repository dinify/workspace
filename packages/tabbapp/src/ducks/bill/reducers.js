// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  bill: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_BILL_DONE: {
      const bill = action.payload.res;
      return R.assoc('bill', bill)(state);
    }
    default:
      return state;
  }
}
