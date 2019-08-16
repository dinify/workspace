import * as types from './types';

export const clearTable = (payload: object) => ({
  type: types.CLEAR_TABLE_INIT,
  payload
})

export const clearUser = (payload: object) => ({
  type: types.CLEAR_USER_INIT,
  payload
})

export const updateTableInit = (payload: object) => ({
  type: types.UPDATE_TABLE_INIT,
  payload
})
