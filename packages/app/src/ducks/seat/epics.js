
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as R from 'ramda';
import { fetchAllUsersInit } from 'ducks/user/actions';
import types from './types';

const fetchUsersOfSeatsEpic = (action$: Observable) =>
  action$.pipe(
    ofType(types.FETCH_SEATS_DONE),
    switchMap(({ payload }) => {
      const userIds = R.pluck('user_id', payload.res);
      return of(fetchAllUsersInit(userIds));
    })
  )

export default [
  fetchUsersOfSeatsEpic
];
