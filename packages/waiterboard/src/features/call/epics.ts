import { from } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import pluck from 'ramda/es/pluck'
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { fetchAllUsersAsync } from '../user/actions';
import uniq from 'ramda/es/uniq';
import { getType } from 'typesafe-actions';
import { fetchCallsAsync, confirmCallAsync } from './actions';

const fetchCallsEpic: Epic = (action$, $state) =>
  action$.pipe(
    ofType(getType(fetchCallsAsync.request)),
    mergeMap((action) => {

      const waiterboardId = $state.value.app.selectedWBId;

      return from(API.GetCallsOfWaiterboard({ waiterboardId })).pipe(
        mergeMap((calls) => {

          const userIds = uniq(pluck('userId')(calls));
          
          return [
            fetchAllUsersAsync.request({ ids: userIds, cache: true }),
            fetchCallsAsync.success(calls)
          ];

        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(fetchCallsAsync.failure),
          initAction: action
        }))
      )

    })
  )

const confirmCallEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(confirmCallAsync.request)),
    mergeMap((action) => {
      
      const { payload } = action;

      return from(API.ConfirmCall(payload)).pipe(
        map(() => confirmCallAsync.success(payload)),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(confirmCallAsync.failure),
          initAction: action
        }))
      );

    })
  );

export default [
  fetchCallsEpic,
  confirmCallEpic
]
