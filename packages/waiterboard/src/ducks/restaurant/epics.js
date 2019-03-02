import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, map, catchError, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { actionTypes } from 'react-redux-firebase';
import * as API from 'api/restaurant';
import { setCookie } from '@dinify/common/dist/lib/FN';
import { setWBidAction, loggedFetchedAction, appBootstrap, loadStateInit, confirmationFail  } from './actions';

const setWBEpic = (action$) =>
  action$.pipe(
    ofType('SET_WBID'),
    mergeMap(({ payload: { id } }) => {
      return of({
        type: 'LOAD_STATE_INIT',
        payload: {
          waiterboardId: id
        }
      });
    })
  )

const bootstrapEpic = (action$: Observable) =>
  action$.pipe(
    ofType('persist/REHYDRATE'),
    mergeMap(() => {
      setCookie('lang', 'en', 30);
      return of(appBootstrap());
    })
  );


const getLoggedEpic = (action$: Observable) =>
  action$.pipe(
    filter(action => {
      const triggerOn = [actionTypes.LOGIN, actionTypes.AUTH_EMPTY_CHANGE];
      return triggerOn.includes(action.type);
    }),
    mergeMap(() => of(
      {type: 'LOAD_RESTAURANT'}
    ))
  );

const loadRestaurant = (action$) =>
  action$.pipe(
    ofType('LOAD_RESTAURANT'),
    mergeMap(() => {
      return from(API.GetLoggedRestaurant()).pipe(
        map(loggedUser => loggedFetchedAction(loggedUser)),
        catchError(error => {
          console.log(error);
          return of(appBootstrap());
        })
      );
    })
  );

const guestsPollingEpic = (action$, $state) =>
  action$.pipe(
    ofType('LOAD_STATE_INIT'),
    mergeMap(() => {

      // const waiterboardId = $state.value.restaurant.selectedWBId;

      // API.GetOrders({ waiterboardId }).then((response) => {
      //   // const oh = filter((o) => o.type === 'AHEAD')(response)
      //   const di = filter((o) => o.type === 'DINE_IN')(response)
      //   dispatch({ type: 'GET_ORDERS_DONE', payload: di });
      //   const userIds = pluck('initiator', di);
      //   dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: userIds, cache: true} });
      //   // dispatch({ type: 'GET_ORDERAHEADS_DONE', payload: oh });
      // })
      // API.GetBills({ waiterboardId }).then((response) => {
      //   const userIds = pluck('initiator', response);
      //   dispatch({ type: 'GET_BILLS_DONE', payload: response });
      //   dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: userIds, cache: true} });
      // })

      return [
        {type: 'LOAD_CALL_INIT'},
        {type: 'LOAD_SEATS_INIT'},
        {type: 'LOAD_BOOKING_INIT'}
      ];
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

export default [
  bootstrapEpic,
  getLoggedEpic,
  loadRestaurant,
  guestsPollingEpic,
  confirmationEpic,
  setWBEpic
];
