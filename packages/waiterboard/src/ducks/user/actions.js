import * as types from './types';

export const fetchAllUsers = (payload) => ({
  type: types.FETCHALL_USER_INIT,
  payload
});
