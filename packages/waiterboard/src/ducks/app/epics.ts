import { of } from 'rxjs';
import { mergeMap, mapTo, filter } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { push } from 'connected-react-router';
import { actionTypes } from 'react-redux-firebase';
import * as appTypes from './types';
import { appBootstrap } from './actions';
import * as restaurantTypes from '../restaurant/types';
import * as bookingTypes from '../booking/types';
import * as orderTypes from '../order/types';
import * as billTypes from '../bill/types';
import * as callTypes from '../call/types';
import * as seatTypes from '../seat/types';
import { fetchManagedAsync } from '../restaurant/actions';

const fetchRestaurantInit = () => ({
  type: restaurantTypes.FETCH_RESTAURANT_INIT,
  payload: {
    populateWith: 'waiterboards.tables',
    node: true
  }
})

const bootstrapEpic: Epic = (action$) =>
  action$.pipe(
    ofType('persist/PERSIST'),
    mergeMap(() => {
      return of(appBootstrap());
    })
  );

const selectWBRedirectEpic: Epic = (action$) =>
  action$.pipe(
    ofType(appTypes.SELECT_WAITERBOARD),
    mapTo(push('/board'))
  );

const getLoggedEpic: Epic = (action$, state$) =>
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

      const reactions = [fetchManagedAsync.request()];

      const selectedRestaurant = state$.value.app.selectedRestaurant;
      if (selectedRestaurant) {
        reactions.push(fetchRestaurantInit());
        reactions.push({
          type: 'GET_SERVICES_INIT',
        });
      }

      const waiterboardId = state$.value.app.selectedWBId;
      if (waiterboardId) reactions.push({ type: appTypes.LOAD_STATE_INIT });

      return reactions;

    })
  );

declare global {
  interface Window { initSocket: any; }
}

window.initSocket = window.initSocket || {};

const guestsPollingEpic: Epic = (action$, state$) =>
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