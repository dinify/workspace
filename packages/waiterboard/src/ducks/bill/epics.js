import { of, from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/es/pluck';
import uniq from 'ramda/es/uniq';
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import * as billTypes from 'ducks/bill/types';
import { fetchAllUsers } from 'ducks/user/actions';

const getUsersOfBillsEpic = (action$) =>
  action$.pipe(
    ofType(billTypes.FETCH_TODAYBILLS_DONE),
    mergeMap(({ payload }) => {
      const bills = payload.res;
      const userIds = uniq(pluck('initiator', bills));
      return of(fetchAllUsers({ ids: userIds, cache: true }));
    })
  )

const loadBillEpic = (action$, $state) =>
  action$.pipe(
    ofType(billTypes.LOAD_BILL_INIT),
    switchMap((action) => {
      const waiterboardId = $state.value.app.selectedWBId;
      return from(API.GetTransactionsOfWaiterboard({ waiterboardId })).pipe(
        mergeMap((bills) => {
          const userIds = pluck('initiator', bills);
          return [
            fetchAllUsers({ ids: userIds, cache: true }),
            {
              type: billTypes.LOAD_BILL_DONE,
              payload: { res: bills }
            }
          ]
        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: billTypes.LOAD_BILL_FAIL,
          initAction: action
        }))
      )
    })
  )

export default [
  getUsersOfBillsEpic,
  loadBillEpic
]
