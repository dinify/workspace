// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck'
import filter from 'ramda/src/filter'
import * as API from 'api/restaurant'

const loadSeatEpic = (action$, state$) =>
  action$.pipe(
    ofType('LOAD_SEATS_INIT'),
    switchMap(() => {
      const waiterboardId = state$.value.restaurant.selectedWBId;
      return from(API.GetSeats({ waiterboardId })).pipe(
        mergeMap((allSeats) => {
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
        }),
        catchError(error => of({ type: 'ERROR', payload: error }))
      )
    })
  )

export default [
  loadSeatEpic
]
