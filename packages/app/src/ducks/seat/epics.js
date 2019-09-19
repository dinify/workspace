import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/es/pluck';
import { fetchAllUsersInit } from 'ducks/user/actions';
import types from './types';

const fetchUsersOfSeatsEpic = (action$) =>
  action$.pipe(
    ofType(types.FETCH_SEATS_DONE),
    switchMap(({ payload }) => {
      const userIds = pluck('user_id', payload.res);
      return of(fetchAllUsersInit(userIds));
    })
  )

export default [
  fetchUsersOfSeatsEpic
];
