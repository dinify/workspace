// @flow
import { Observable } from 'rxjs';
import * as API from 'tabb-front/dist/api/restaurant';
// import R from 'ramda';
// import * as FN from 'tabb-front/dist/lib/FN';
import { showSnackbar } from 'ducks/notifications/actions';
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
  action$
    .ofType(types.SPLIT_BILL_INIT)
    .switchMap(({ payload: { orderItems, withIds } }) => {
      console.log(orderItems, withIds);
      return Observable.fromPromise(API.SplitMultiple({ orderItems, withIds }))
        .mergeMap(res => {
          return Observable.of(splitBillDone(res));
        })
        .catch(error => Observable.of(splitBillFail(error)))
    });

const transferEpic = (action$: Observable) =>
  action$
    .ofType(types.TRANSFER_BILL_INIT)
    .switchMap(({ payload: { itemId, userId } }) => {
      return Observable.fromPromise(API.TransferBill({ itemId, userId }))
        .mergeMap(res => {
          return Observable.of(transferBillDone(res));
        })
        .catch(error => Observable.of(transferBillFail(error)))
    });

const initTransactionEpic = (action$: Observable) =>
  action$
    .ofType(types.INIT_TRANSACTION_INIT)
    .switchMap(({ payload: { type, gratuity } }) => {
      return Observable.fromPromise(API.InitiateTransaction({ type, gratuity }))
        .mergeMap(res => {
          // window.location.href = '/receipt';
          return Observable.of(
            initTransactionDone(res),
            showSnackbar({
              message: 'Payment request sent'
            })
          );
        })
        .catch(error => Observable.of(initTransactionFail(error)))
    });

export default [
  splitEpic,
  transferEpic,
  initTransactionEpic
];
