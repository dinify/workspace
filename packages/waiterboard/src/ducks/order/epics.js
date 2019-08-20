import { from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/src/pluck';
import * as API from '@dinify/common/dist/api/restaurant';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import { fetchAllUsers } from 'ducks/user/actions';
import * as orderTypes from 'ducks/order/types';

const loadOrderEpic = (action$, $state) =>
  action$.pipe(
    ofType(orderTypes.LOAD_ORDER_INIT),
    switchMap((action) => {

      const waiterboardId = $state.value.app.selectedWBId;

      return from(API.GetOrders({ waiterboardId })).pipe(
        mergeMap((orders) => {

          const userIds = pluck('initiator', orders);

          return [
            fetchAllUsers({ ids: userIds, cache: true }),
            {
              type: orderTypes.LOAD_ORDER_DONE,
              payload: { res: orders }
            }
          ];
          
        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: orderTypes.LOAD_ORDER_FAIL,
          initAction: action
        }))
      )
    })
  )

export default [
  loadOrderEpic
];
