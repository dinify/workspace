import { of, from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import {
  initTransactionAsync
} from './actions';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { getType } from 'typesafe-actions';
import { InitTransactionResponse } from 'TransactionModels';

const { handleEpicAPIError } = require('@dinify/common/dist/lib/FN');
const snackbar = require('material-ui-snackbar-redux').snackbarActions;

// const splitEpic = (action$) =>
//   action$.pipe(
//     ofType(types.SPLIT_BILL_INIT),
//     switchMap((action) => {
//       const { payload: { orderItems, withIds } } = action;
//       return from(API.SplitMultiple({ orderItems, withIds })).pipe(
//         mergeMap(res => of(splitBillDone(res))),
//         catchError(error => handleEpicAPIError({
//           error,
//           failActionType: types.SPLIT_BILL_FAIL,
//           initAction: action
//         }))
//       )
//     })
//   );
// 
// const transferEpic = (action$) =>
//   action$.pipe(
//     ofType(types.TRANSFER_BILL_INIT),
//     switchMap((action) => {
//       const { payload: { itemId, userId } } = action;
//       return from(API.TransferBill({ itemId, userId })).pipe(
//         mergeMap(res => of(transferBillDone(res))),
//         catchError(error => handleEpicAPIError({
//           error,
//           failActionType: types.TRANSFER_BILL_FAIL,
//           initAction: action
//         }))
//       )
//     })
//   )

const initTransactionEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(initTransactionAsync.request)),
    mergeMap((action) => {
      const { payload: { type, gratuity } } = action;
      const promise = API.InitiateTransaction({ type, gratuity });
      
      return from(promise).pipe(
        mergeMap((res: InitTransactionResponse) => of(
          initTransactionAsync.success(res),
          snackbar.show({
            message: 'Payment request sent'
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(initTransactionAsync.failure),
          initAction: action
        }))
      );
    })
  );

export default [
  // splitEpic,
  // transferEpic,
  initTransactionEpic
];
