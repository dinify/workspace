// @flow
import R from 'ramda';
import types from './types';
import { selectedBillItems } from 'ducks/seat/selectors';

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
      const newState =  R.assocPath(['seats', seatIndex, 'bill', 'items', billItemIndex, 'selected'], selected)(state);
      if (selectedBillItems({seat: newState}).length <= 0) {
        for (let i = 0; i < newState.seats.length; i += 1) {
          newState.seats[i].selected = false;
        }
      }
      return newState;
    }
    case types.SELECT_SEAT: {
      const { selected, seatIndex } = action.payload;
      return R.assocPath(['seats', seatIndex, 'selected'], selected)(state);
    }
    case types.CLEAR_SELECTED_BILLITEMS: {
      // TODO: ramda impl
      const newState = Object.assign({}, state);
      for (let i = 0; i < state.seats.length; i += 1) {
        newState.seats[i].selected = false;
        if (state.seats[i].bill && state.seats[i].bill.items) {
          for (let j = 0; j < state.seats[i].bill.items.length; j += 1) {
            newState.seats[i].bill.items[j].selected = false;
          }
        }
      }
      return newState;
    }
    default:
      return state;
  }
}
