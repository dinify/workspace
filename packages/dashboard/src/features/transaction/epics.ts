import { from as rxFrom, of } from 'rxjs';
import { map as rxMap, mergeMap, catchError } from 'rxjs/operators';
import { Epic, ofType } from 'redux-observable';
import { getType } from 'typesafe-actions';


import * as API from '@dinify/common/src/api/v2/restaurant';
import { fetchTransactionsAsync } from './actions';
import { handleEpicAPIError, ListToMap } from '@dinify/common/src/lib/FN';


const getTransactionsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchTransactionsAsync.request)),
    mergeMap((action) => {

      const { from, to } = action.payload;

      if (!from || !to) {
        return of(fetchTransactionsAsync.failure('invalid-time-range'));
      }

      const body = {
        restaurantId: state$.value.restaurant.selectedRestaurant,
        from: from.valueOf(),
        to: to.valueOf()
      }

      return rxFrom(API.GetTransactionsHistory(body)).pipe(
        rxMap((res: any) => {
          return fetchTransactionsAsync.success(ListToMap(res));
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
