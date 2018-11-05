// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  snackbars: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'persist/REHYDRATE': {
      return R.assoc('errorsMap', {})(R.assoc('progressMap', {})(state));
    }
    case types.ACTIVE_ACTION: {
      return R.assocPath(['progressMap', action.payload], true)(state);
    }
    case types.UNACTIVE_ACTION: {
      return R.assocPath(['progressMap', action.payload], false)(state);
    }
    default:
      return state;
  }
}
