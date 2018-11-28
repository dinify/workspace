// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  snackbars: [],
  current: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.DISPATCH_SNACKBAR: {
      const {
        actionTitle = null,
        message = '',
        redirect = null,
        id
      } = action.payload;
      const snackbar = {
        actionTitle,
        message,
        redirect,
        open: false,
        id
      };
      const newState = R.assoc('current', snackbar)(state);
      return R.assoc('snackbars', [snackbar, ...state.snackbars])(newState);
    }
    case types.SHOW_SNACKBAR: {
      const { id } = action.payload;
      return R.assoc('snackbars', state.snackbars.map((s) => {
        const newS = s;
        if (newS.id === id) {
          newS.open = true;
        }
        return newS;
      }))(state);
    }
    case types.HIDE_SNACKBAR: {
      const { id } = action.payload;
      return R.assoc('snackbars', state.snackbars.map((s) => {
        const newS = s;
        if (newS.id === id) {
          newS.open = false;
        }
        return newS;
      }))(state);
    }
    case types.RM_SNACKBAR: {
      const { id } = action.payload;
      return R.assoc('snackbars', R.filter((s) => s.id !== id, state.snackbars))(state);
    }
    default:
      return state;
  }
}
