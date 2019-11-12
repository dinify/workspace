import { from } from 'rxjs';
import { mergeMap, switchMap, catchError, map } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import pluck from 'ramda/es/pluck';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { fetchAllUsersAsync } from '../user/actions';
import { getType } from 'typesafe-actions';
import { fetchBillsAsync, confirmBillAsync } from './actions';

const fetchBillsEpic: Epic = (action$, $state) =>
  action$.pipe(
    ofType(getType(fetchBillsAsync.request)),
    switchMap((action) => {

      const waiterboardId = $state.value.app.selectedWBId;

      return from(API.GetTransactionsOfWaiterboard({ waiterboardId })).pipe(
        mergeMap((bills: any) => {
          const userIds = pluck('initiator')(bills);
          return [
            fetchAllUsersAsync.request({ ids: userIds, cache: true }),
            fetchBillsAsync.success(bills)
          ]
        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(fetchBillsAsync.failure),
          initAction: action
        }))
      )

    })
  );

const confirmBillEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(confirmBillAsync.request)),
    mergeMap((action) => {
      
      const { payload } = action;

      return from(API.ConfirmBill(payload)).pipe(
        map(() => confirmBillAsync.success(payload)),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(confirmBillAsync.failure),
          initAction: action
        }))
      );

    })
  );

export default [
  fetchBillsEpic,
  confirmBillEpic
];
