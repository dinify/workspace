import { of, from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck'
import filter from 'ramda/src/filter'
import * as API from '@dinify/common/dist/api/restaurant';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';

const loadSeatEpic = (action$, state$) =>
  action$.pipe(
    ofType('LOAD_SEATS_INIT'),
    mergeMap((action) => {
      const waiterboardId = state$.value.restaurant.selectedWBId;
      return from(API.GetSeatsOfWB({ waiterboardId, node: true })).pipe(
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
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'ERROR',
          initAction: action
        }))
      )
    })
  )

const reloadSeatsEpic = (action$) =>
  action$.pipe(
    ofType('SEAT_RECEIVED'),
    mergeMap(() => {
      return of({
        type: 'LOAD_SEATS_INIT'
      });
    })
  )

export default [
  loadSeatEpic,
  reloadSeatsEpic
]
