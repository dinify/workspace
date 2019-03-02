// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, map, catchError, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck'
import * as API from 'api/restaurant'

const loadCallEpic = (action$: Observable, $state) =>
  action$.pipe(
    ofType('LOAD_CALL_INIT'),
    switchMap(() => {
      const waiterboardId = $state.value.restaurant.selectedWBId;
      return from(API.GetCalls({ waiterboardId })).pipe(
        mergeMap((calls) => {
          const userIds = pluck('initiator', calls).filter((id) => id.length === 24)
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
