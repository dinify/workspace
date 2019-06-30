import assoc from 'ramda/src/assoc';
import pipe from 'ramda/src/pipe';
import types from './types';

const initialState = {
  bill: {},
  lastBill: {},
  receipt: {},
  gratitude: 10
};

export default function reducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case 'persist/REHYDRATE': {
      if (!payload || !payload.bill) return state;
      return pipe(
        assoc('bill', {}),
        assoc('lastBill', payload.bill.lastBill)
      )(state);
    }
    case types.FETCH_BILL_DONE: {
      const bill = payload.res;
      return pipe(
        (state) => Object.keys(bill).length > 0 ? assoc('lastBill', bill)(state) : state,
        assoc('bill', bill)
      )(state);
    }
    case types.FETCH_RECEIPT_DONE: {
      const receipt = payload.res;
      return assoc('receipt', receipt)(state);
    }
    case types.SET_GRATITUDE: {
      const { percentage } = payload;
      return assoc('gratitude', percentage)(state);
    }
    default:
      return state;
  }
}
