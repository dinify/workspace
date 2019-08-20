import { from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck'
import * as API from '@dinify/common/dist/api/restaurant';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import { fetchAllUsers } from 'ducks/user/actions';
import * as callTypes from 'ducks/call/types';

const loadCallEpic = (action$, $state) =>
  action$.pipe(
    ofType(callTypes.LOAD_CALL_INIT),
    mergeMap((action) => {

      const waiterboardId = $state.value.app.selectedWBId;

      return from(API.GetCalls({ waiterboardId, node: true })).pipe(
        mergeMap((calls) => {

          const userIds = pluck('user_id', calls);
          
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
