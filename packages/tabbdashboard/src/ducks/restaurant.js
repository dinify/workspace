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
  ChangeLocation,
  ChangeBank,
  ChangeHours,
  AddTablet
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
export const UPDATE_LOCATION_INIT = 'universalreact/restaurant/UPDATE_LOCATION_INIT';
export const UPDATE_BANK_INIT = 'universalreact/restaurant/UPDATE_BANK_INIT';
export const UPDATE_HOURS_INIT = 'universalreact/restaurant/UPDATE_HOURS_INIT';
export const UPDATE_DONE = 'universalreact/restaurant/UPDATE_DONE';

export const ADD_TABLET_INIT = 'universalreact/restaurant/ADD_TABLET_INIT';
export const ADD_TABLET_DONE = 'universalreact/restaurant/ADD_TABLET_DONE';

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
  addTabletDone: null,
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
    case UPDATE_LOCATION_INIT: {
      state = R.assocPath(['loggedRestaurant', 'location', 'longitude'], Number(action.payload.longitude))(state);
      return R.assocPath(['loggedRestaurant', 'location', 'latitude'], Number(action.payload.latitude))(state);
    }
    case UPDATE_HOURS_INIT: {
      const { weekdayFrom, weekdayTo, weekendFrom, weekendTo } = action.payload;
      return R.assocPath(['loggedRestaurant', 'businessHours'], {
        weekday: {from: weekdayFrom, to: weekdayTo},
        weekend: {from: weekendFrom, to: weekendTo}
      })(state);
    }
    case UPDATE_BANK_INIT: {
      return R.assocPath(['loggedRestaurant', 'bank'], action.payload)(state);
    }
    case UPDATE_DONE:
      return R.assoc('updateDone', 'done')(state);
    case ADD_TABLET_INIT: {
      const { login_id, name } = action.payload;
      const newTablet = { login_id, name };
      state = R.assoc('addTabletDone', 'adding')(state);
      return R.assocPath(['loggedRestaurant', 'tablets'], [...state.loggedRestaurant.tablets, newTablet])(state);
    }
    case ADD_TABLET_DONE:
      return R.assoc('addTabletDone', 'done')(state);
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

export function updateLocationInitAction({ name, longitude, latitude }) {
  return { type: UPDATE_LOCATION_INIT, payload: { name, longitude, latitude }};
}

export function updateBankInitAction({ name, beneficiaryName, IBAN }) {
  return { type: UPDATE_BANK_INIT, payload: { name, beneficiaryName, IBAN }};
}

export function updateHoursInitAction({ weekdayFrom, weekdayTo, weekendFrom, weekendTo }) {
  return { type: UPDATE_HOURS_INIT, payload: { weekdayFrom, weekdayTo, weekendFrom, weekendTo }};
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

export function addTabletInitAction({ login_id, pass_enc, name }) {
  return { type: ADD_TABLET_INIT, payload: { login_id, pass_enc, name }};
}
export function addTabletDoneAction() {
  return { type: ADD_TABLET_DONE };
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
const updateLocationEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .ofType(UPDATE_LOCATION_INIT)
    .switchMap(({ payload: { name, longitude, latitude } }) =>
      Observable.fromPromise(ChangeLocation({
        restaurantId: getState().restaurant.loggedRestaurant.id,
        name, longitude, latitude
      }))
        .map(updateDoneAction)
        .catch(error => console.log(error))
    );
const updateBankEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .ofType(UPDATE_BANK_INIT)
    .switchMap(({ payload: { name, beneficiaryName, IBAN } }) =>
      Observable.fromPromise(ChangeBank({
        restaurantId: getState().restaurant.loggedRestaurant.id,
        name, beneficiaryName, IBAN
      }))
        .map(updateDoneAction)
        .catch(error => console.log(error))
    );
const updateHoursEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .ofType(UPDATE_HOURS_INIT)
    .switchMap(({ payload: { weekdayFrom, weekdayTo, weekendFrom, weekendTo } }) =>
      Observable.fromPromise(ChangeHours({
        restaurantId: getState().restaurant.loggedRestaurant.id,
        weekdayFrom, weekdayTo, weekendFrom, weekendTo
      }))
        .map(updateDoneAction)
        .catch(error => console.log(error))
    );
const addTabletEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
    .ofType(ADD_TABLET_INIT)
    .switchMap(({ payload: { login_id, pass_enc, name } }) =>
      Observable.fromPromise(AddTablet({
        restaurantId: getState().restaurant.loggedRestaurant.id,
        login_id, pass_enc, name
      }))
        .map(addTabletDoneAction)
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
  updateSocialEpic,
  updateLocationEpic,
  updateHoursEpic,
  updateBankEpic,
  addTabletEpic
];
