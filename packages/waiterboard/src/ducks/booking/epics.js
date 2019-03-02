// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck'
import * as API from 'api/restaurant'
import { ListToMap } from 'lib/FN'

const loadBookingEpic = (action$: Observable) =>
  action$.pipe(
    ofType('LOAD_BOOKING_INIT'),
    switchMap(() => {
      return from(API.GetBookings()).pipe(
        mergeMap((bookings) => {
          const userIds = pluck('initiator', bookings).filter((id) => id.length === 24)
          return [
            {
              type: 'FETCHALL_USER_INIT',
              payload: { ids: userIds, cache: true }
            },
            {
              type: 'LOAD_BOOKING_DONE',
              payload: {res: ListToMap(bookings) }
            }
          ]
        }),
        catchError(error => of({ type: 'ERROR', payload: error }))
      )
    })
  )

export default [
  loadBookingEpic
]
