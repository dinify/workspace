import * as types from './types';

interface ClearTable {
  table: object;
}

export const clearTable = (payload: ClearTable) => ({
  type: types.CLEAR_TABLE_INIT,
  payload
})

interface ClearUser {
  userId: string;
}

export const clearUser = (payload: ClearUser) => ({
  type: types.CLEAR_USER_INIT,
  payload
})

interface UpdateTable {
  id: string;
  offline: boolean;
}

export const updateTableInit = (payload: UpdateTable) => ({
  type: types.UPDATE_TABLE_INIT,
  payload
})
