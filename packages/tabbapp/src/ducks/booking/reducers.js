// @flow
import R from 'ramda';
import types from './types';
import * as FN from 'lib/FN';

const initialState = {
  time: null,
  guests: null,
  date: new Date(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_TIME: {
      return R.assoc('time', action.payload)(state);
    }
    case types.SET_GUESTS: {
      return R.assoc('guests', action.payload)(state);
    }
    case types.SET_DATE: {
      return R.assoc('date', action.payload)(state);
    }
    default:
      return state;
  }
}
