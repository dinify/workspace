// @flow
import { Observable } from 'rxjs';
import types from './types';
import { logoutInit } from 'ducks/auth/actions';

const unloggedEpic = (action$: Observable) =>
  action$
    .ofType(types.FETCH_ME_FAIL)
    .map(({ payload }) => {
      if (payload instanceof Array && payload[0].status === 401) {
        return logoutInit();
      }
      return Observable.of();
    });

export default [
  unloggedEpic
];
