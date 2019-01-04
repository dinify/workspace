import types from './types';

export const openDialog = (e) => ({
  type: types.DIALOG_OPEN,
  payload: e
})

export const closeDialog = (e) => ({
  type: types.DIALOG_CLOSE,
  payload: e
})
