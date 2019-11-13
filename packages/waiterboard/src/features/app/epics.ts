import { of } from 'rxjs';
import { mergeMap, mapTo, filter } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { push } from 'connected-react-router';
import { actionTypes } from 'react-redux-firebase';
import * as appTypes from './types';
import { appBootstrap } from './actions';
import { fetchManagedAsync, fetchRestaurantAsync } from '../restaurant/actions';
import { fetchBillsAsync } from '../bill/actions';
import { fetchOrdersAsync } from '../order/actions';
import { fetchCallsAsync } from '../call/actions';
import { fetchSeatsAsync } from '../seat/actions';

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
        reactions.push(fetchRestaurantAsync.request());
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

window.initSocket = window.initSocket || null;

const guestsPollingEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(appTypes.LOAD_STATE_INIT),
    mergeMap(() => {
      const waiterboardId = state$.value.app.selectedWBId;
      window.initSocket(waiterboardId);
      let actions: any[] = [];
      if (waiterboardId) {
        actions = [
          fetchOrdersAsync.request(),
          fetchBillsAsync.request(),
          fetchCallsAsync.request(),
          fetchSeatsAsync.request(),
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