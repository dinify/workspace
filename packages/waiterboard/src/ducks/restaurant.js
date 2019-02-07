// @flow
import { Observable } from 'rxjs';
import * as API from '../api/restaurant';
import { setCookie} from 'tabb-front/dist/lib/FN';

import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import filter from 'ramda/src/filter'
import pluck from 'ramda/src/pluck'

export const BOOTSTRAP = 'BOOTSTRAP';
export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_DONE = 'LOGIN_DONE';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_INIT = 'LOGOUT_INIT';
export const LOGOUT_DONE = 'LOGOUT_DONE';
export const LOGGED_FETCHED_DONE = 'LOGGED_FETCHED_DONE';

const initialState = {
  selectedWBId: null,
  appRun: false,
  loggedUser: null,
  sales: 0,
  timer: {
    o: 200
  }
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_DONE:
      return state;
    case 'SET_WBID':
      return assoc('selectedWBId', action.payload.id)(state);
    case BOOTSTRAP:
      return assoc('appRun', true)(state);
    case 'LOGGED_FETCHED_DONE':
      return assoc('loggedUser', action.payload)(state);
    case 'GET_SALES_DONE':
      return assoc('sales', action.payload.sales)(state);
    case 'SET_TIMER': {
      setCookie('timer-'+action.payload.key, action.payload.val, 30);
      return assocPath(['timer', action.payload.key], action.payload.val)(state);
    }
    default:
      return state;
  }
}


// Action Creators
export function loginInitAction({ email, password }) {
  return { type: LOGIN_INIT, payload: { email, password }};
}

export function logoutInitAction() {
  return { type: LOGOUT_INIT };
}

export function loginDoneAction(res: object) {
  setCookie('access_token', res.token, 30);
  window.location.replace("/board");
  return { type: LOGIN_DONE, payload: res };
}

export function logoutDoneAction(res: object) {
  setCookie('access_token', '', 1);
  window.location.replace("/");
  return { type: LOGOUT_DONE, payload: res };
}

export function loggedFetchedAction(res: object) {
  return { type: 'LOGGED_FETCHED_DONE', payload: res };
}

export function loginFailAction(err) {
  return { type: LOGIN_FAIL, payload: err };
}

export function appBootstrap() {
  return { type: BOOTSTRAP };
}

export function loadStateInit() {
  return { type: 'LOAD_STATE_INIT' };
}

export const confirmService = (payload) => ({ type: 'SERVICE_CONFIRMATION_INIT', payload })
export const confirmOrder = (payload) => ({ type: 'ORDER_CONFIRMATION_INIT', payload })
export const confirmOrderAhead = (payload) => ({ type: 'ORDERAHEAD_CONFIRMATION_INIT', payload })
export const confirmBill = (payload) => ({ type: 'BILL_CONFIRMATION_INIT', payload })
export const confirmationFail = () => ({ type: 'CONFIRMATION_FAIL' })
export const setTimer = (payload) => ({ type: 'SET_TIMER', payload })
export const setOHEnabled = () => ({ type: 'SET_OHENABLED_INIT' })
export const getBillsOfUser = (payload) => ({ type: 'GET_BILLSOFUSER_INIT', payload })
export const getOrdersOfUser = (payload) => ({ type: 'GET_ORDERSOFUSER_INIT', payload })

export const setWBidAction = (id) => {
  const path = window.location.pathname
  if (path.includes('/board/') && path.length > 20) id = path.replace('/board/','').replace('/','')
  if (id) window.initSocket(id);
  return {
    type: 'SET_WBID',
    payload: { id }
  }
}

const setWBEpic = (action$: Observable) =>
  action$
  .ofType('SET_WBID')
  .mergeMap(({ payload: { id } }) => {
    return Observable.of({
      type: 'LOAD_STATE_INIT',
      payload: {
        waiterboardId: id
      }
    });
  })


// Epics
const bootstrapEpic = (action$: Observable, { getState, dispatch }: EpicDependencies) =>
  action$.ofType('persist/REHYDRATE').mergeMap(() => {
    return Observable.fromPromise(API.GetLoggedRestaurant())
      .concatMap((loggedUser) => {
        console.log(loggedUser);
        return Observable.of(setWBidAction(), loggedFetchedAction(loggedUser), appBootstrap(), loadStateInit())
      })
      .catch(error => {
        if (window.location.pathname !== '/' && window.location.pathname !== '/signup') window.location.replace("/");
        return Observable.of(appBootstrap());
      });
  });

const guestsPollingEpic = (action$: Observable, { dispatch, getState }) =>
  action$
    .ofType('LOAD_STATE_INIT')
    .mergeMap(() => {

      const waiterboardId = getState().restaurant.selectedWBId;

      API.GetOrders({ waiterboardId }).then((response) => {
        // const oh = filter((o) => o.type === 'AHEAD')(response)
        const di = filter((o) => o.type === 'DINE_IN')(response)
        dispatch({ type: 'GET_ORDERS_DONE', payload: di });
        const userIds = pluck('initiator', di);
        dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: userIds, cache: true} });
        // dispatch({ type: 'GET_ORDERAHEADS_DONE', payload: oh });
      })
      API.GetBills({ waiterboardId }).then((response) => {
        const userIds = pluck('initiator', response);
        dispatch({ type: 'GET_BILLS_DONE', payload: response });
        dispatch({ type: 'FETCHALL_USER_INIT', payload: {ids: userIds, cache: true} });
      })

      return Observable.of(
        {type: 'LOAD_CALL_INIT'},
        {type: 'LOAD_SEATS_INIT'},
        {type: 'LOAD_BOOKING_INIT'}
      );
    });

const loginEpic = (action$: Observable) =>
  action$
  .ofType(LOGIN_INIT)
  .switchMap(({ payload: { email, password } }) => {
    return Observable.fromPromise(API.Login({ email, password }))
      .map(loginDoneAction)
      .catch(error => Observable.of(loginFailAction(error)))
  })

const logoutEpic = (action$: Observable) =>
  action$.ofType(LOGOUT_INIT).map(logoutDoneAction)

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const camel = (str) => capitalize(str.toLowerCase())
const actionEssence = (str) => camel(str.split('_')[0])

const confirmationEpic = (action$: Observable) =>
  action$
    .filter(action => action.type.includes('CONFIRMATION') && action.type.includes('INIT'))
    .switchMap(({ type, payload }) => {
      const APIcall = API[`Confirm${actionEssence(type)}`]
      return Observable.fromPromise(APIcall({...payload}))
        .delay(200)
        .map(() => ({
          type: 'CONFIRMATION_DONE',
          payload: { type: actionEssence(type), ...payload }
        }))
        .catch(error => Observable.of(confirmationFail(error)))
    });


export const epics = [
  bootstrapEpic,
  guestsPollingEpic,
  loginEpic,
  logoutEpic,
  confirmationEpic,
  setWBEpic
];
