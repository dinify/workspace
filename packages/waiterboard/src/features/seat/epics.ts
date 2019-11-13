import { from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import pluck from 'ramda/es/pluck';
import filter from 'ramda/es/filter';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { fetchAllUsersAsync } from '../user/actions';
import { getType } from 'typesafe-actions';
import { fetchSeatsAsync } from './actions';

const loadSeatEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchSeatsAsync.request)),
    mergeMap((action) => {

      const waiterboardId = state$.value.app.selectedWBId;

      return from(API.GetSeatsOfWaiterboard({ waiterboardId })).pipe(
        mergeMap((allSeats) => {

          const seats = filter((seat: any) => seat.occupied, allSeats);
          const userIds = pluck('userId')(seats);

          return [
            fetchAllUsersAsync.request({ ids: userIds, cache: true }),
            fetchSeatsAsync.success(seats)
          ];

        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(fetchSeatsAsync.failure),
          initAction: action
        }))
      )
    })
  )

export default [
  loadSeatEpic
]
