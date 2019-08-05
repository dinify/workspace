import { of, from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck'
import * as API from '@dinify/common/dist/api/restaurant';

const loadCallEpic = (action$, $state) =>
  action$.pipe(
    ofType('LOAD_CALL_INIT'),
    mergeMap(() => {

      const waiterboardId = $state.value.restaurant.selectedWBId;
      console.log("INIT.....");

      return from(API.GetCalls({ waiterboardId, node: true })).pipe(
        mergeMap((calls) => {

          console.log("DONE.....");

          const userIds = pluck('user_id', calls);
          
          return [
            {
              type: 'FETCHALL_USER_INIT',
              payload: { ids: userIds, cache: true }
            },
            {
              type: 'LOAD_CALL_DONE',
              payload: {res: calls }
            }
          ]
        }),
        catchError(error => of({ type: 'ERROR', payload: error }))
      )

    })
  )

export default [
  loadCallEpic
]
