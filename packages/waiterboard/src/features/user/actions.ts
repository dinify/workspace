import { createAsyncAction } from 'typesafe-actions';

const p = 'dinify/user';

export const fetchUserAsync = createAsyncAction(
  `${p}/GET_USER_INIT`,
  `${p}/GET_USER_DONE`,
  `${p}/GET_USER_FAIL`,
)<any, any, any>();

export const fetchAllUsersAsync = createAsyncAction(
  `${p}/GETALL_USERS_INIT`,
  `${p}/GETALL_USERS_DONE`,
  `${p}/GETALL_USERS_FAIL`,
)<any, any, any>();
