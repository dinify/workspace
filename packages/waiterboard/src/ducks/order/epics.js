import { from } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pluck from 'ramda/es/pluck';
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import { handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import { fetchAllUsers } from 'ducks/user/actions';
import * as orderTypes from 'ducks/order/types';
import uniq from 'ramda/es/uniq';

const loadOrderEpic = (action$, $state) =>
  action$.pipe(
    ofType(orderTypes.LOAD_ORDER_INIT),
    switchMap((action) => {

      const waiterboardId = $state.value.app.selectedWBId;

      return from(API.GetOrdersOfWaiterboard({ waiterboardId })).pipe(
        mergeMap((orders) => {

          const userIds = uniq(pluck('initiator', orders));

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
