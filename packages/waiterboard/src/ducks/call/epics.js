import { from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/es/pluck'
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import { fetchAllUsers } from 'ducks/user/actions';
import * as callTypes from 'ducks/call/types';
import uniq from 'ramda/es/uniq';

const loadCallEpic = (action$, $state) =>
  action$.pipe(
    ofType(callTypes.LOAD_CALL_INIT),
    mergeMap((action) => {

      const waiterboardId = $state.value.app.selectedWBId;

      return from(API.GetCallsOfWaiterboard({ waiterboardId })).pipe(
        mergeMap((calls) => {

          const userIds = uniq(pluck('userId', calls));
          
          return [
            fetchAllUsers({ ids: userIds, cache: true }),
            {
              type: callTypes.LOAD_CALL_DONE,
              payload: { res: calls }
            }
          ];

        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: callTypes.LOAD_CALL_FAIL,
          initAction: action
        }))        
      )

    })
  )

export default [
  loadCallEpic
]
