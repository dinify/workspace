// @flow
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import R from 'ramda';
import types from './types';
import { fetchAllUsersInit } from 'ducks/user/actions';

const fetchUsersOfSeatsEpic = (action$: Observable) =>
  action$.pipe(
    ofType(types.FETCH_SEATS_DONE),
    switchMap(({ payload }) => {
      const userIds = R.pluck('user_id', payload.res).filter((id) => id.length === 24)
      return of(fetchAllUsersInit(userIds));
    })
  )

export default [
  fetchUsersOfSeatsEpic
];
