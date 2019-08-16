import * as types from './types';

export const clearTable = (payload) => ({
  type: types.CLEAR_TABLE_INIT,
  payload
})

export const clearUser = (payload) => ({
  type: types.CLEAR_USER_INIT,
  payload
})

export const updateTableInit = (payload) => ({
  type: types.UPDATE_TABLE_INIT,
  payload
})
