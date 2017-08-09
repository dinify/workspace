// @flow

import { Observable } from 'rxjs';
import R from 'ramda';
//import { getJoke } from '../selectors/viewer';
import { Login as LoginCall, GetLoggedRestaurant } from '../api/restaurant';
import type { EpicDependencies, Error, Action } from '../flow';
import { browserHistory } from 'react-router';

export const BOOTSTRAP = 'universalreact/restaurant/BOOTSTRAP';
export const LOGIN_INIT = 'universalreact/restaurant/LOGIN_INIT';
export const LOGIN_DONE = 'universalreact/restaurant/LOGIN_DONE';
export const LOGIN_FAIL = 'universalreact/restaurant/LOGIN_FAIL';
export const LOGGED_FETCHED_DONE = 'LOGGED_FETCHED_DONE';

type State = {
  searchLoading: boolean,
  appRun: boolean,
  joke: ?string,
  lastError: ?Error,
  loggedRestaurant: ?Object,
};

const initialState = {
  searchLoading: false,
  appRun: false,
  joke: null,
  lastError: null,
  loggedRestaurant: null,
};

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  console.log(action);
  switch (action.type) {
    case LOGIN_DONE:
      return state;
    case BOOTSTRAP:
      return R.assoc('appRun', true)(state);
    case LOGGED_FETCHED_DONE:
      return R.assoc('loggedRestaurant', action.payload)(state);
    default:
      return state;
  }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Action Creators
export function loginInitAction({ username, password }) {
  return { type: LOGIN_INIT, payload: { username, password }};
}

export function loginDoneAction(res: object) {
  setCookie('access_token', res.access_token, 30);
  window.location.replace("/dashboard");
  return { type: LOGIN_DONE, payload: res };
}

export function loggedFetchedAction(res: object) {
  //console.log(res, "dddd");
  return { type: LOGGED_FETCHED_DONE, payload: res };
}

export function loginFailAction(err: Error) {
  return { type: LOGIN_FAIL, payload: err };
}

export function appBootstrap() {
  return { type: BOOTSTRAP };
}

// Epics
const bootstrapEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$.ofType('persist/REHYDRATE').mergeMap(() => {


    return Observable.fromPromise(GetLoggedRestaurant())
      .mergeMap((loggedUser) => Observable.of(loggedFetchedAction(loggedUser), appBootstrap()))
      .catch(error => {
        console.log(error);
        if (window.location.pathname !== '/') window.location.replace("/");
        return Observable.of(appBootstrap());
      });

    // if there is no gif fetched already, fetch the random one
    //const joke = getJoke(getState());
    //if (!joke) {
    //  return Observable.of(appBootstrap(), fetchInitAction());
    //}
  });

const loginEpic = (action$: Observable) =>
  action$
    .ofType(LOGIN_INIT)
    .switchMap(({ payload: { username, password } }) =>
      Observable.fromPromise(LoginCall({ username, password }))
        .map(loginDoneAction)
        .catch(error => Observable.of(loginFailAction(error)))
    );

export const epics = [bootstrapEpic, loginEpic];
