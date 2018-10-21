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
    case types.CLEAR_SELECTED_BILLITEMS: {
      // TODO: ramda impl
      for (let i = 0; i < state.seats.length; i += 1) {
        if (state.seats[i].bill && state.seats[i].bill.items) {
          for (let j = 0; j < state.seats[i].bill.items.length; j += 1) {
            state.seats[i].bill.items[j].selected = false;
          }
        }
      }
      return state;
    }
    default:
      return state;
  }
}
