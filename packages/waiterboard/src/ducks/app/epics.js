import { of } from 'rxjs';
import { mergeMap, mapTo, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { push } from 'connected-react-router';
import { appBootstrap } from 'ducks/app/actions';
import { actionTypes } from 'react-redux-firebase';
import * as appTypes from 'ducks/app/types';
import * as restaurantTypes from 'ducks/restaurant/types';
import * as bookingTypes from 'ducks/booking/types';
import * as orderTypes from 'ducks/order/types';
import * as billTypes from 'ducks/bill/types';
import * as callTypes from 'ducks/call/types';
import * as seatTypes from 'ducks/seat/types';

const bootstrapEpic = (action$) =>
  action$.pipe(
    ofType('persist/PERSIST'),
    mergeMap(() => {
      return of(appBootstrap());
    })
  );

const selectWBRedirectEpic = (action$) =>
  action$.pipe(
    ofType(appTypes.SELECT_WAITERBOARD),
    mapTo(push('/board'))
  );

const getLoggedEpic = (action$, state$) =>
  action$.pipe(
    filter(action => {
      const triggerOn = [
        actionTypes.LOGIN,
        actionTypes.AUTH_EMPTY_CHANGE,
        appTypes.SELECT_WAITERBOARD
      ];
      return triggerOn.includes(action.type);
    }),
    mergeMap(() => {

      const reactions = [{ type: restaurantTypes.FETCH_MANAGEDRESTAURANTS_INIT }];

      const selectedRestaurant = state$.value.app.selectedRestaurant;
      if (selectedRestaurant) {
        reactions.push({
          type: restaurantTypes.FETCH_RESTAURANT_INIT,
          payload: {
            populateWith: 'waiterboards.tables',
            node: true
          }
        });
        reactions.push({
          type: 'GET_SERVICES_INIT',
        });
      }

      const waiterboardId = state$.value.app.selectedWBId;
      if (waiterboardId) reactions.push({ type: appTypes.LOAD_STATE_INIT });

      return reactions;

    })
  );

const guestsPollingEpic = (action$, state$) =>
  action$.pipe(
    ofType(appTypes.LOAD_STATE_INIT),
    mergeMap(() => {
      const waiterboardId = state$.value.app.selectedWBId;
      window.initSocket(waiterboardId);
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
  selectWBRedirectEpic,
  getLoggedEpic
];