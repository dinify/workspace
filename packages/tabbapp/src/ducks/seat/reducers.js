// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  seats: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SEATS_DONE: {
      const seats = action.payload.res;
      return R.assoc('seats', seats)(state);
    }
    case types.SELECT_BILLITEM: {
      const { selected, seatIndex, billItemIndex } = action.payload;
      return R.assocPath(['seats', seatIndex, 'bill', 'items', billItemIndex, 'selected'], selected)(state);
    }
    default:
      return state;
  }
}
