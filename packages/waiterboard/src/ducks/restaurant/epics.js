import { of, from } from 'rxjs';
import { mergeMap, switchMap, map, catchError, filter, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { push } from 'connected-react-router';
import { actionTypes } from 'react-redux-firebase';
import * as API from '@dinify/common/dist/api/restaurant';
import { setCookie } from '@dinify/common/dist/lib/FN';
import { appBootstrap, confirmationFail  } from './actions';

const bootstrapEpic = (action$) =>
  action$.pipe(
    ofType('persist/REHYDRATE'),
    mergeMap(() => {
      return of(appBootstrap());
    })
  );

const selectWBRedirectEpic = (action$) =>
  action$.pipe(
    ofType('SELECT_WAITERBOARD'),
    mapTo(push('/board'))
  );

const loadRestaurant = (action$) =>
  action$.pipe(
    ofType('LOAD_RESTAURANT'),
    mergeMap(() => {
      return of(
        {type: 'FETCH_LOGGEDRESTAURANT_INIT'},
        // {type: 'FETCH_LANGUAGES_INIT'},
        // {type: 'FETCH_TRANSLATIONS_INIT'},
        // {type: 'FETCH_SERVICEIMAGES_INIT'},
        // {type: 'FETCH_RESTAURANTSETTINGS_INIT'},
        // {type: 'FETCH_MENULANGUAGES_INIT'}
      );
    })
  );

const getLoggedEpic = (action$, state$) =>
  action$.pipe(
    filter(action => {
      const triggerOn = [actionTypes.LOGIN, actionTypes.AUTH_EMPTY_CHANGE, 'SELECT_WAITERBOARD'];
      return triggerOn.includes(action.type);
    }),
    mergeMap(() => {
      const reactions = [{type: 'FETCH_MANAGEDRESTAURANTS_INIT'}];
      const selectedRestaurant = state$.value.restaurant.selectedRestaurant;
      if (selectedRestaurant) reactions.push({type: 'LOAD_RESTAURANT'});
      const waiterboardId = state$.value.restaurant.selectedWBId;
      if (waiterboardId) reactions.push({type: 'LOAD_STATE_INIT'});
      return reactions;
    })
  );

const guestsPollingEpic = (action$, state$) =>
  action$.pipe(
    ofType('LOAD_STATE_INIT'),
    mergeMap(() => {
      const waiterboardId = state$.value.restaurant.selectedWBId;
      let actions = [
        {type: 'LOAD_BOOKING_INIT'}
      ]
      if (waiterboardId) {
        actions = [
          {type: 'LOAD_ORDER_INIT'},
          {type: 'LOAD_BILL_INIT'},
          {type: 'LOAD_CALL_INIT'},
          {type: 'LOAD_SEATS_INIT'},
          ...actions
        ]
      }
      return actions;
    })
  )

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const camel = (str) => capitalize(str.toLowerCase())
const actionEssence = (str) => camel(str.split('_')[0])

const confirmationEpic = (action$) =>
  action$.pipe(
    filter(action => action.type.includes('CONFIRMATION') && action.type.includes('INIT')),
    switchMap(({ type, payload }) => {
      const APIcall = API[`Confirm${actionEssence(type)}`]
      return from(APIcall({...payload})).pipe(
        // delay(200)
        map(() => ({
          type: 'CONFIRMATION_DONE',
          payload: { type: actionEssence(type), ...payload }
        })),
        catchError(error => of(confirmationFail(error)))
      )
    })
  )

const confirmationSyncEpic = (action$, state$) =>
  action$.pipe(
    ofType('CONFIRMATION_DONE'),
    mergeMap(({ payload }) => {
      if (payload.stopPropagation) {
        return of({ type: 'CONFIRMATIONSYNC_DONE' });
      }
      const waiterboardId = state$.value.restaurant.selectedWBId;
      const promise = API.Notify({
        sendTo: [`waiterboard/${waiterboardId}`],
        type: 'confirmation',
        payload: { ...payload, instanceId: document.instanceId }
      });
      return from(promise).pipe(
        map(() => ({ type: 'CONFIRMATIONSYNC_DONE' })),
        catchError(error => of(confirmationFail(error)))
      )
    })
  )

export default [
  bootstrapEpic,
  getLoggedEpic,
  loadRestaurant,
  guestsPollingEpic,
  confirmationEpic,
  confirmationSyncEpic,
  selectWBRedirectEpic
];
