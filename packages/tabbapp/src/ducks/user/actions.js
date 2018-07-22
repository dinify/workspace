import types from './types';

export const fetchMeInit = () => ({
  type: types.FETCH_ME_INIT,
});

export const fetchMeFail = (e) => ({
  type: types.FETCH_ME_FAIL,
  payload: e
});

export const fetchAllUsersInit = (userIds) => ({
  type: types.FETCHALL_USER_INIT,
  payload: { ids: userIds, cache: true }
});
