// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck'
import uniq from 'ramda/src/uniq'
import * as API from 'api/restaurant'

const getUsersOfBillsEpic = (action$) =>
  action$.pipe(
    ofType('FETCH_TODAYBILLS_DONE'),
    mergeMap(({ payload }) => {
      const bills = payload.res;
      const userIds = uniq(pluck('initiator', bills));
      return of({
        type: 'FETCHALL_USER_INIT',
        payload: { ids: userIds, cache: true }
      })
    })
  )

const loadBillEpic = (action$: Observable, $state) =>
  action$.pipe(
    ofType('LOAD_BILL_INIT'),
    switchMap(() => {
      const waiterboardId = $state.value.restaurant.selectedWBId;
      return from(API.GetBills({ waiterboardId })).pipe(
        mergeMap((bills) => {
          const userIds = pluck('initiator', bills).filter((id) => id.length === 24)
          return [
            {
              type: 'FETCHALL_USER_INIT',
              payload: { ids: userIds, cache: true }
            },
            {
              type: 'LOAD_BILL_DONE',
              payload: {res: bills }
            }
          ]
        }),
        catchError(error => of({ type: 'ERROR', payload: error }))
      )
    })
  )

export default [
  getUsersOfBillsEpic,
  loadBillEpic
]
