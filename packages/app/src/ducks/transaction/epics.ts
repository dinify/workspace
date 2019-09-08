import { of, from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import types from './types';
import {
  initTransactionDone,
} from './actions';
import * as API from '@dinify/common/src/api/v2/restaurant';

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
    ofType(types.INIT_TRANSACTION_INIT),
    switchMap((action) => {
      const { payload: { type, gratuity } } = action;
      return from(API.InitiateTransaction({ type, gratuity })).pipe(
        mergeMap(res => of(
          initTransactionDone(res),
          snackbar.show({
            message: 'Payment request sent'
          })
        )),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: types.INIT_TRANSACTION_FAIL,
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
