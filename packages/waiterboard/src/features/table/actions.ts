import * as types from './types';


export const clearTable = (payload: types.ClearTable) => ({
  type: types.CLEAR_TABLE_INIT,
  payload
})


export const clearUser = (payload: types.ClearUser) => ({
  type: types.CLEAR_USER_INIT,
  payload
})


export const updateTableInit = (payload: types.UpdateTable) => ({
  type: types.UPDATE_TABLE_INIT,
  payload
})
