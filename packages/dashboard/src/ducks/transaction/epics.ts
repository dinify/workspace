import { from as rxFrom } from 'rxjs';
import { map as rxMap, mergeMap, catchError } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { getType } from 'typesafe-actions';


import * as API from '@dinify/common/src/api/v2/restaurant';
import { fetchTransactionsAsync } from './actions';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';


const getTransactionsEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(fetchTransactionsAsync.request)),
    mergeMap((action) => {

      const { from, to } = action.payload;
      const promise = API.GetTransactionsHistory({ from, to });

      return rxFrom(promise).pipe(
        rxMap((res: any) => {
          return fetchTransactionsAsync.success(res);
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchTransactionsAsync.failure),
            initAction: action
          })
        })
      );

    })
  );

export default [
  getTransactionsEpic
];
