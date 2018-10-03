// @flow
import { Observable } from 'rxjs';
import * as API from 'api/restaurant';
// import R from 'ramda';
// import * as FN from 'lib/FN';
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
    .switchMap(({ payload: { itemId, userIds } }) => {
      return Observable.fromPromise(API.SplitBill({ itemId, userIds }))
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
          return Observable.of(initTransactionDone(res));
        })
        .catch(error => Observable.of(initTransactionFail(error)))
    });

export default [
  splitEpic,
  transferEpic,
  initTransactionEpic
];
