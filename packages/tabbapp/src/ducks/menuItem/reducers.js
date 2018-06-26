// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  all: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MENUITEMS_DONE: {
      const items = action.payload.res;
      return R.assoc('all', items)(state);
    }

    default:
      return state;
  }
}
