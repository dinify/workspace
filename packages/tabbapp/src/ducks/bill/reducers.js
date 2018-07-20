// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  bill: {},
  stage: 'PAYING', // or SELECTING
  gratitude: 10
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_BILL_DONE: {
      const bill = action.payload.res;
      return R.assoc('bill', bill)(state);
    }
    case types.SELECT_BILLITEM: {
      if (!state.bill.items || state.bill.items.length < 1) return state;
      const { index, selected } = action.payload;
      return R.assocPath(['bill', 'items', index, 'selected'], selected)(state);
    }
    case types.SET_GRATITUDE: {
      const { percentage } = action.payload;
      return R.assoc('gratitude', percentage)(state);
    }
    default:
      return state;
  }
}
