import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/es/pluck';
import { fetchAllUsers } from 'features/user/actions';
import * as bookingTypes from 'features/booking/types';

const loadBookingEpic = (action$) =>
  action$.pipe(
    ofType(bookingTypes.FETCH_BOOKINGS_DONE),
    mergeMap(({ payload }) => {
      const bookings = payload.res;
      const userIds = pluck('initiator', bookings);
      return of(fetchAllUsers({ ids: userIds, cache: true }));
    })
  )

export default [
  loadBookingEpic
]
