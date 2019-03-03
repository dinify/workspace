// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck'
import * as API from 'api/restaurant'

const loadOrderEpic = (action$: Observable, $state) =>
  action$.pipe(
    ofType('LOAD_ORDER_INIT'),
    switchMap(() => {
      const waiterboardId = $state.value.restaurant.selectedWBId;
      return from(API.GetOrders({ waiterboardId })).pipe(
        mergeMap((orders) => {
          const userIds = pluck('initiator', orders).filter((id) => id.length === 24)
          return [
            {
              type: 'FETCHALL_USER_INIT',
              payload: { ids: userIds, cache: true }
            },
            {
              type: 'LOAD_ORDER_DONE',
              payload: {res: orders }
            }
          ]
        }),
        catchError(error => of({ type: 'ERROR', payload: error }))
      )
    })
  )

export default [
  loadOrderEpic
]
