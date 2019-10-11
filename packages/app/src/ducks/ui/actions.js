import * as types from './types';

export const openDialog = (e) => ({
  type: types.DIALOG_OPEN,
  payload: e
})

export const closeDialog = (e) => ({
  type: types.DIALOG_CLOSE,
  payload: e
})

export const toggleTheme = (e) => ({
  type: types.TOGGLE_THEME,
  payload: e
})

export const setLocale = (e) => ({
  type: types.SET_LOCALE,
  payload: e
})
