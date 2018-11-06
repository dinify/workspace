// @flow
import R from 'ramda';
import moment from 'moment';
import types from './types';

const initialState = {
  snackbars: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_SNACKBAR: {
      const {
        actionTitle = null,
        message = '',
        redirect = null
      } = action.payload;
      const snackbar = {
        actionTitle,
        message,
        redirect,
        open: true,
        id: moment().valueOf()
      };
      return R.assoc('snackbars', [...state.snackbars, snackbar])(state);
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
