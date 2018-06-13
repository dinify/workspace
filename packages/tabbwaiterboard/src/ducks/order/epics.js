import { Observable } from 'rxjs'
import R from 'ramda'
import * as API from 'api/restaurant'
import { ListToMap } from 'lib/FN'

const loadBookingEpic = (action$: Observable) =>
  action$
  .ofType('LOAD_BOOKING_INIT')
  .switchMap(() => {
    return Observable.fromPromise(API.GetBookings())
      .mergeMap((bookings) => {

        const userIds = R.pluck('initiator', bookings).filter((id) => id.length === 24)

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
      })
      .catch(error => Observable.of({ type: 'ERROR' }))
  })



export default [
  loadBookingEpic
]
