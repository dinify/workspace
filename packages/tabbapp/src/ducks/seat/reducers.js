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
    default:
      return state;
  }
}
