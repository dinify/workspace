import { from } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import pluck from 'ramda/es/pluck';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { fetchAllUsersAsync } from '../user/actions';
import uniq from 'ramda/es/uniq';
import { fetchOrdersAsync, confirmOrderAsync } from './actions';
import { getType } from 'typesafe-actions';

const fetchOrdersEpic: Epic = (action$, $state) =>
  action$.pipe(
    ofType(getType(fetchOrdersAsync.request)),
    mergeMap((action) => {

      const waiterboardId = $state.value.app.selectedWBId;

      return from(API.GetOrdersOfWaiterboard({ waiterboardId })).pipe(
        mergeMap((orders: any) => {

          const userIds = uniq(pluck('initiator')(orders));

          return [
            fetchAllUsersAsync.request({ ids: userIds, cache: true }),
            fetchOrdersAsync.success(orders)
          ];
          
        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(fetchOrdersAsync.failure),
          initAction: action
        }))
      )
    })
  )

const confirmOrderEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(confirmOrderAsync.request)),
    mergeMap((action) => {
      
      const { payload } = action;

      return from(API.ConfirmOrder(payload)).pipe(
        map(() => confirmOrderAsync.success(payload)),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(confirmOrderAsync.failure),
          initAction: action
        }))
      );

    })
  );

export default [
  fetchOrdersEpic,
  confirmOrderEpic
];
