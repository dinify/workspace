// @flow

import { Observable } from 'rxjs';
import R from 'ramda';
//import { getJoke } from '../selectors/viewer';
import {
  Login as LoginCall,
  Signup as SignupCall,
  Logout as LogoutCall,
  GetLoggedRestaurant,
  ChangeName,
  ChangeCategory,
  ChangeContact,
  ChangeSocial,
} from '../api/restaurant';
import type { EpicDependencies, Error, Action } from '../flow';
import { browserHistory } from 'react-router';

export const BOOTSTRAP = 'universalreact/restaurant/BOOTSTRAP';
export const LOGIN_INIT = 'universalreact/restaurant/LOGIN_INIT';
export const LOGIN_DONE = 'universalreact/restaurant/LOGIN_DONE';
export const LOGIN_FAIL = 'universalreact/restaurant/LOGIN_FAIL';

export const LOGOUT_INIT = 'universalreact/restaurant/LOGOUT_INIT';
export const LOGOUT_DONE = 'universalreact/restaurant/LOGOUT_DONE';

export const SIGNUP_INIT = 'universalreact/restaurant/SIGNUP_INIT';
export const SIGNUP_DONE = 'universalreact/restaurant/SIGNUP_DONE';
export const SIGNUP_FAIL = 'universalreact/restaurant/SIGNUP_FAIL';

export const LOGGED_FETCHED_DONE = 'LOGGED_FETCHED_DONE';

export const UPDATE_INIT = 'universalreact/restaurant/UPDATE_INIT';
export const UPDATE_CATEGORY_INIT = 'universalreact/restaurant/UPDATE_CATEGORY_INIT';
export const UPDATE_CONTACT_INIT = 'universalreact/restaurant/UPDATE_CONTACT_INIT';
export const UPDATE_SOCIAL_INIT = 'universalreact/restaurant/UPDATE_SOCIAL_INIT';
export const UPDATE_DONE = 'universalreact/restaurant/UPDATE_DONE';

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
  updateDone: null,
};

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  console.log(action);
  if(action.type.indexOf('UPDATE') > -1 && action.type.indexOf('INIT') > -1) {
    // update init
    state = R.assoc('updateDone', 'updating')(state);
    console.log('UPDATE INIT');
  }
  switch (action.type) {
    case LOGIN_DONE:
      return state;
    case BOOTSTRAP:
      return R.assoc('appRun', true)(state);
    case LOGGED_FETCHED_DONE:
      return R.assoc('loggedRestaurant', action.payload)(state);
    case UPDATE_INIT:
      return R.assocPath(['loggedRestaurant', 'restaurantName'], action.payload.restaurantName)(state);
    case UPDATE_CATEGORY_INIT:
      return R.assocPath(['loggedRestaurant', 'category'], action.payload.category)(state);
    case UPDATE_DONE:
      return R.assoc('updateDone', 'done')(state);
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
export function updateInitAction({ restaurantName }) {
  return { type: UPDATE_INIT, payload: { restaurantName }};
}

export function updateDoneAction() {
  return { type: UPDATE_DONE };
}

export function updateCategoryInitAction({ category }) {
  return { type: UPDATE_CATEGORY_INIT, payload: { category }};
}

export function updateContactInitAction({ nameInCharge, email, mobile }) {
  return { type: UPDATE_CONTACT_INIT, payload: { nameInCharge, email, mobile }};
}

export function updateSocialInitAction({ facebookURL, instagramURL }) {
  return { type: UPDATE_SOCIAL_INIT, payload: { facebookURL, instagramURL }};
}

export function loginInitAction({ email, password }) {
  return { type: LOGIN_INIT, payload: { email, password }};
}

export function logoutInitAction() {
  return { type: LOGOUT_INIT };
}

export function loginDoneAction(res: object) {
  setCookie('access_token', res.access_token, 30);
  window.location.replace("/dashboard");
  return { type: LOGIN_DONE, payload: res };
}

export function logoutDoneAction(res: object) {
  setCookie('access_token', '', 1);
  window.location.replace("/");
  return { type: LOGOUT_DONE, payload: res };
}

export function loggedFetchedAction(res: object) {
  //console.log(res, "dddd");
  return { type: LOGGED_FETCHED_DONE, payload: res };
}

export function loginFailAction(err: Error) {
  return { type: LOGIN_FAIL, payload: err };
}

export function signupInitAction({ email, password, restaurantName, nameInCharge, mobile }) {
  return { type: SIGNUP_INIT, payload: { email, password, restaurantName, nameInCharge, mobile }};
}
export function signupDoneAction(res: object) {
  //window.location.replace("/");
  console.log(res);
  return { type: SIGNUP_DONE, payload: res };
}
export function signupFailAction(err: Error) {
  return { type: SIGNUP_FAIL, payload: err };
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
        if (window.location.pathname !== '/' && window.location.pathname !== '/signup') window.location.replace("/");
        return Observable.of(appBootstrap());
      });
  });

const loginEpic = (action$: Observable) =>
  action$
    .ofType(LOGIN_INIT)
    .switchMap(({ payload: { email, password } }) =>
      Observable.fromPromise(LoginCall({ email, password }))
        .map(loginDoneAction)
        .catch(error => Observable.of(loginFailAction(error)))
    );

const logoutEpic = (action$: Observable) =>
  action$
    .ofType(LOGOUT_INIT)
    .switchMap(() =>
      Observable.fromPromise(LogoutCall())
        .map(logoutDoneAction)
        .catch(error => Observable.of(loginFailAction(error)))
    );

const signupEpic = (action$: Observable) =>
  action$
    .ofType(SIGNUP_INIT)
    .switchMap(({ payload: { email, password, restaurantName, nameInCharge, mobile } }) =>
      Observable.fromPromise(SignupCall({ email, password, restaurantName, nameInCharge, mobile }))
        .map(signupDoneAction)
        .catch(error => Observable.of(signupFailAction(error)))
    );

const updateEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .ofType(UPDATE_INIT)
    .switchMap(({ payload: { restaurantName } }) =>
      Observable.fromPromise(ChangeName({ restaurantId: getState().restaurant.loggedRestaurant.id, restaurantName }))
        .map(updateDoneAction)
        .catch(error => console.log(error))
    );

const updateCategoryEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .ofType(UPDATE_CATEGORY_INIT)
    .switchMap(({ payload: { category } }) =>
      Observable.fromPromise(ChangeCategory({ restaurantId: getState().restaurant.loggedRestaurant.id, category }))
        .map(updateDoneAction)
        .catch(error => console.log(error))
    );

const updateContactEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .ofType(UPDATE_CONTACT_INIT)
    .switchMap(({ payload: { nameInCharge, email, mobile } }) =>
      Observable.fromPromise(ChangeContact({
        restaurantId: getState().restaurant.loggedRestaurant.id,
        nameInCharge, email, mobile
      }))
        .map(updateDoneAction)
        .catch(error => console.log(error))
    );

const updateSocialEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .ofType(UPDATE_SOCIAL_INIT)
    .switchMap(({ payload: { facebookURL, instagramURL } }) =>
      Observable.fromPromise(ChangeSocial({
        restaurantId: getState().restaurant.loggedRestaurant.id,
        facebookURL, instagramURL
      }))
        .map(updateDoneAction)
        .catch(error => console.log(error))
    );

export const epics = [
  bootstrapEpic,
  loginEpic,
  signupEpic,
  logoutEpic,
  updateEpic,
  updateCategoryEpic,
  updateContactEpic,
  updateSocialEpic
];
