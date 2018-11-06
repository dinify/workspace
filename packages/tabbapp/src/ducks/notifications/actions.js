// @flow
import types from './types';

export const showSnackbar = (payload) => ({
  type: types.SHOW_SNACKBAR,
  payload
})

export const hideSnackbar = (payload) => ({
  type: types.HIDE_SNACKBAR,
  payload
})
