// @flow
import R from 'ramda';
import types from './types';
import * as FN from 'lib/FN';

const initialState = {
  all: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MENUCATEGORIES_DONE: {
      const categories = action.payload.res;
      return R.assoc('all', FN.ListToMap(categories))(state);
    }

    default:
      return state;
  }
}
