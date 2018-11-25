// @flow
import { Observable } from 'rxjs';
import * as API from '../api/restaurant';
import type { Error, Action } from '../flow';

import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import dissocPath from 'ramda/src/dissocPath'
import reject from 'ramda/src/reject'
import keys from 'ramda/src/keys'
import filter from 'ramda/src/filter'
import pluck from 'ramda/src/pluck'

export const BOOTSTRAP = 'BOOTSTRAP';
export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_DONE = 'LOGIN_DONE';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_INIT = 'LOGOUT_INIT';
export const LOGOUT_DONE = 'LOGOUT_DONE';
export const LOGGED_FETCHED_DONE = 'LOGGED_FETCHED_DONE';

type State = {
  searchLoading: boolean,
  appRun: boolean,
  lastError: ?Error,
  loggedUser: ?Object,
};

function getCookie(cname) {
  let name = cname + "="
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return false
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const initialState = {
  selectedWBId: null,
  searchLoading: false,
  appRun: false,
  lastError: null,
  loggedUser: null,
  updateDone: null,
  events: {},
  acceptedBookings: [],
  sales: 0,
  order_ahead_enabled: null,
  timer: {
    o: 200
  }
};

const makeEventId = (type, id) => `${type}_${id}`
const makeNewEvent = (type, content) => ({
  type,
  id: makeEventId(type, content.id),
  content
})
const makeUpdatedEvents = (action, state, eventType) => {
  let eventsCopy = state.events
  const existingIds = []
  action.payload
  .filter((o) => {
    if (o.tableNumber !== undefined) {
      if (o.tableNumber === "0") return false
      return true
    }
    return true
  })
  .map((o) => ({ ...o, eventId: makeEventId(eventType, o.id)}))
  .forEach((o) => {
    existingIds.push(o.eventId)
    eventsCopy[o.eventId] = makeNewEvent(eventType, o)
  })
  return reject((ev) => {
    if (ev.id.split('_')[0] !== eventType) return false;
    if (existingIds.includes(ev.id)) return false;
    return true;
  }, eventsCopy)
}

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  if(action.type.includes('UPDATE') && action.type.includes('INIT')) {
    // update init
    state = assoc('updateDone', 'updating')(state);
  }
  if(action.type.includes('CONFIRMATION') && action.type.includes('INIT')) {
    const type = action.type.split('_')[0]
    const key = keys(action.payload)[0]
    const id = action.payload[key]
    const eventId = `${type}_${id}`
    return assocPath(['events', eventId, 'removed'], true)(state);
  }
  switch (action.type) {
    case LOGIN_DONE:
      return state;
    case 'SET_WBID':
      return assoc('selectedWBId', action.payload.id)(state);
    case BOOTSTRAP:
      return assoc('appRun', true)(state);
    case 'GET_OHENABLED_DONE':
      return assoc('order_ahead_enabled', action.payload.order_ahead_enabled)(state);
    case 'SET_OHENABLED_DONE':
      return assoc('order_ahead_enabled', action.payload.enabled)(state);
    case 'LOGGED_FETCHED_DONE':
      return assoc('loggedUser', action.payload)(state);
    case 'GET_BOOKINGS_DONE': {
      return assoc('events', makeUpdatedEvents(action, state, 'BOOKING'))(state);
    }
    case 'GET_SERVICES_DONE':
      return assoc('events', makeUpdatedEvents(action, state, 'SERVICE'))(state);
    //case 'GET_ORDERS_DONE':
    //  return assoc('events', makeUpdatedEvents(action, state, 'ORDER'))(state);
    case 'GET_ORDERAHEADS_DONE':
      return assoc('events', makeUpdatedEvents(action, state, 'ORDERAHEAD'))(state);
    case 'GET_ACCEPTED_BOOKING_DONE':
      return assoc('acceptedBookings', action.payload)(state);
    case 'GET_SALES_DONE':
      return assoc('sales', action.payload.sales)(state);
    case 'SET_TIMER': {
      setCookie('timer-'+action.payload.key, action.payload.val, 30);
      return assocPath(['timer', action.payload.key], action.payload.val)(state);
    }
    case 'CONFIRMATION_DONE': {
      switch (action.payload.type) {
        case 'Order':
          return dissocPath(['events', makeEventId('ORDER', action.payload.orderId)])(state);
        case 'Orderahead':
          return dissocPath(['events', makeEventId('ORDERAHEAD', action.payload.orderId)])(state);
        case 'Service':
          return dissocPath(['events', makeEventId('SERVICE', action.payload.serviceId)])(state);
        case 'Booking':
          return dissocPath(['events', makeEventId('BOOKING', action.payload.bookingId)])(state);
        case 'Bill':
          return dissocPath(['events', makeEventId('BILL', action.payload.billId)])(state);
        default:
          return state;
      }
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

export function loginFailAction(err: Error) {
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

export const getTablesInit = () => ({ type: 'GET_TABLES_INIT' })

export const setTimer = (payload) => ({ type: 'SET_TIMER', payload })

export const setOHEnabled = () => ({ type: 'SET_OHENABLED_INIT' })


export const getBillsOfUser = (payload) => ({ type: 'GET_BILLSOFUSER_INIT', payload })
export const getOrdersOfUser = (payload) => ({ type: 'GET_ORDERSOFUSER_INIT', payload })


export const setWBidAction = (id) => {
  const path = window.location.pathname
  if (path.includes('/board/') && path.length > 20) id = path.replace('/board/','').replace('/','')
  window.initSocket(id);
  return {
    type: 'SET_WBID',
    payload: { id }
  }
}



// Epics
const bootstrapEpic = (action$: Observable, { getState, dispatch }: EpicDependencies) =>
  action$.ofType('persist/REHYDRATE').mergeMap(() => {
    return Observable.fromPromise(API.GetLoggedRestaurant())
      .mergeMap((loggedUser) => {
        //API.GetOrderAheadEnabled({ restaurantId: loggedUser.id }).then((payload) => {
        //  dispatch({ type: 'GET_OHENABLED_DONE', payload });
        //})

        return Observable.of(setWBidAction(), loggedFetchedAction(loggedUser), appBootstrap(), loadStateInit()) // getTablesInit()
      })
      .catch(error => {
        if (window.location.pathname !== '/' && window.location.pathname !== '/signup') window.location.replace("/");
        return Observable.of(appBootstrap());
      });
  });

const getTablesEpic = (action$: Observable) =>
  action$
    .ofType('GET_TABLES_INIT')
    .switchMap(() =>
      Observable.fromPromise(API.GetTables())
        .map((payload) => ({ type: 'GET_TABLES_DONE', payload }))
        .catch(error => Observable.of({ type: 'GET_TABLES_FAIL' }))
    );

const guestsPollingEpic = (action$: Observable, { dispatch, getState }) =>
  action$
    .ofType('LOAD_STATE_INIT')
    .mergeMap(() => {
      let waiterboardId = getState().restaurant.selectedWBId;

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
      dispatch({type: 'LOAD_CALL_INIT'});
      dispatch({type: 'LOAD_SEATS_INIT'});


      const loadInitData = () => {
        console.log('start');
        dispatch({type: 'LOAD_BOOKING_INIT'});
        return { type: 'LOAD_STATE_DONE', payload: {} };
      }
      return Observable.interval(10000).startWith(0).map(loadInitData);
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

const confirmationEpic = (action$: Observable, { getState }) =>
  action$
    .filter(action => action.type.includes('CONFIRMATION') && action.type.includes('INIT'))
    .switchMap(({ type, payload }) => {
      const state = getState()
      const restaurantId = state.restaurant.loggedUser.restaurant
      const APIcall = API[`Confirm${actionEssence(type)}`]
      return Observable.fromPromise(APIcall({...payload, restaurantId}))
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
  getTablesEpic,
];
