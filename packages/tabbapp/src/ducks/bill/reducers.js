// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  bill: {},
  lastBill: {},
  receipt: {},
  gratitude: 10
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'persist/REHYDRATE': {
      return R.assoc('lastBill', action.payload.bill.lastBill)(R.assoc('bill', {})(state));
    }
    case types.FETCH_BILL_DONE: {
      const bill = action.payload.res;
      if (Object.keys(bill).length > 0) {
        state = R.assoc('lastBill', bill)(state);
      }
      return R.assoc('bill', bill)(state);
    }
    case types.FETCH_RECEIPT_DONE: {
      const receipt = action.payload.res;
      return R.assoc('receipt', receipt)(state);
    }
    case types.SET_GRATITUDE: {
      const { percentage } = action.payload;
      return R.assoc('gratitude', percentage)(state);
    }
    default:
      return state;
  }
}
