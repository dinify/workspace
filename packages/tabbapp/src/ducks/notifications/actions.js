// @flow
import moment from 'moment';
import types from './types';

export const showSnackbar = (payload) => ({
  type: types.SHOW_SNACKBAR,
  payload
})

export const dispatchSnackbar = (payload) => ({
  type: types.DISPATCH_SNACKBAR,
  payload: {...payload, id: moment().valueOf()}
})

export const hideSnackbar = (payload) => ({
  type: types.HIDE_SNACKBAR,
  payload
})
