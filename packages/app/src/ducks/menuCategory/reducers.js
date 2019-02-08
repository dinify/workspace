// @flow
import R from 'ramda';
import types from './types';
import * as FN from '@dinify/common/dist/lib/FN';

const initialState = {
  all: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MENUCATEGORIES_DONE: {
      let categories = action.payload.res || [];
      categories = categories.map((c) => R.dissoc('items')(c))
      return R.assoc('all', FN.ListToMap(categories))(state);
    }

    default:
      return state;
  }
}
