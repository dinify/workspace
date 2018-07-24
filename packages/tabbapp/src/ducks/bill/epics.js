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
  transferBillFail
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

export default [
  splitEpic,
  transferEpic
];
