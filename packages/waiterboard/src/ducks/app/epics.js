import { of } from 'rxjs';
import { mergeMap, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { push } from 'connected-react-router';
import { appBootstrap } from 'ducks/app/actions';
import * as appTypes from 'ducks/app/types';
import * as bookingTypes from 'ducks/booking/types';
import * as orderTypes from 'ducks/order/types';
import * as billTypes from 'ducks/bill/types';
import * as callTypes from 'ducks/call/types';
import * as seatTypes from 'ducks/seat/types';

const bootstrapEpic = (action$) =>
  action$.pipe(
    ofType('persist/REHYDRATE'),
    mergeMap(() => {
      return of(appBootstrap());
    })
  );

const selectWBRedirectEpic = (action$) =>
  action$.pipe(
    ofType(appTypes.SELECT_WAITERBOARD),
    mapTo(push('/board'))
  );

const guestsPollingEpic = (action$, state$) =>
  action$.pipe(
    ofType(appTypes.LOAD_STATE_INIT),
    mergeMap(() => {
      const waiterboardId = state$.value.app.selectedWBId;
      let actions = [
        { type: bookingTypes.FETCH_BOOKINGS_INIT }
      ]
      if (waiterboardId) {
        actions = [
          { type: orderTypes.LOAD_ORDER_INIT },
          { type: billTypes.LOAD_BILL_INIT },
          { type: callTypes.LOAD_CALL_INIT },
          { type: seatTypes.LOAD_SEATS_INIT },
          ...actions
        ]
      }
      return actions;
    })
  )

export default [
  bootstrapEpic,
  guestsPollingEpic,
  selectWBRedirectEpic
];
