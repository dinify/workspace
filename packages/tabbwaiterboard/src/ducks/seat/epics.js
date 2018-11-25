import { Observable } from 'rxjs'
import pluck from 'ramda/src/pluck'
import filter from 'ramda/src/filter'
import * as API from 'api/restaurant'

const loadSeatEpic = (action$, { getState }) =>
  action$
  .ofType('LOAD_SEATS_INIT')
  .switchMap(() => {
    const waiterboardId = getState().restaurant.selectedWBId
    return Observable.fromPromise(API.GetSeats({ waiterboardId }))
      .mergeMap((allSeats) => {
        const seats = filter((seat) => seat.occupied, allSeats);
        const userIds = pluck('user_id', seats)
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
