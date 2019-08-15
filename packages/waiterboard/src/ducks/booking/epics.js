import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck';
import * as types from './types';

const loadBookingEpic = (action$) =>
  action$.pipe(
    ofType(types.FETCH_BOOKINGS_DONE),
    mergeMap(({ payload }) => {
      const bookings = payload.res;
      const userIds = pluck('initiator', bookings).filter((id) => id.length === 24)
      return of({
        type: 'FETCHALL_USER_INIT',
        payload: { ids: userIds, cache: true, node: true }
      });
    })
  )

export default [
  loadBookingEpic
]
