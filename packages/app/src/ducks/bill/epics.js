// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as API from '@dinify/common/dist/api/restaurant';
// import * as R from 'ramda';
// import * as FN from '@dinify/common/dist/lib/FN';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux'
import types from './types';
import {
  splitBillDone,
  splitBillFail,
  transferBillDone,
  transferBillFail,
  initTransactionDone,
  initTransactionFail
} from './actions';

const splitEpic = (action$: Observable) =>
  action$.pipe(
    ofType(types.SPLIT_BILL_INIT),
    switchMap(({ payload: { orderItems, withIds } }) => {
      console.log(orderItems, withIds);
      return from(API.SplitMultiple({ orderItems, withIds })).pipe(
        mergeMap(res => of(splitBillDone(res))),
        catchError(error => of(splitBillFail(error)))
      )
    })
  );

const transferEpic = (action$: Observable) =>
  action$.pipe(
    ofType(types.TRANSFER_BILL_INIT),
    switchMap(({ payload: { itemId, userId } }) => {
      return from(API.TransferBill({ itemId, userId })).pipe(
        mergeMap(res => of(transferBillDone(res))),
        catchError(error => of(transferBillFail(error)))
      )
    })
  )


const initTransactionEpic = (action$: Observable) =>
  action$.pipe(
    ofType(types.INIT_TRANSACTION_INIT),
    switchMap(({ payload: { type, gratuity } }) => {
      return from(API.InitiateTransaction({ type, gratuity })).pipe(
        mergeMap(res => of(
          initTransactionDone(res),
          snackbar.show({
            message: 'Payment request sent'
          })
        )),
        catchError(error => of(initTransactionFail(error)))
      );
    })
  );

export default [
  splitEpic,
  transferEpic,
  initTransactionEpic
];
