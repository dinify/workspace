// @flow
import { Observable } from 'rxjs';
import R from 'ramda';
import types from './types';
import { fetchAllUsersInit } from 'ducks/user/actions';

const fetchUsersOfSeatsEpic = (action$: Observable) =>
  action$
    .ofType(types.FETCH_SEATS_DONE)
    .switchMap(({ payload }) => {
      const userIds = R.pluck('user_id', payload.res).filter((id) => id.length === 24)
      return Observable.of(fetchAllUsersInit(userIds));
    });

export default [
  fetchUsersOfSeatsEpic
];
