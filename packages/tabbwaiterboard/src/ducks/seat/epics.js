import { Observable } from 'rxjs'
import R from 'ramda'
import * as API from 'api/restaurant'

const loadSeatEpic = (action$, { getState }) =>
  action$
  .ofType('LOAD_SEATS_INIT')
  .switchMap(() => {
    const waiterboardId = getState().restaurant.selectedWBId
    return Observable.fromPromise(API.GetSeats({ waiterboardId }))
      .mergeMap((allSeats) => {
        const seats = R.filter((seat) => seat.occupied, allSeats);
        const userIds = R.pluck('user_id', seats)
        console.log(userIds);
        return [
          {
            type: 'FETCHALL_USER_INIT',
            payload: { ids: userIds, cache: true }
          },
          {
            type: 'LOAD_SEATS_DONE',
            payload: {res: seats }
          }
        ]
      })
      .catch(error => Observable.of({ type: 'ERROR', payload: error }))
  })

export default [
  loadSeatEpic
]
