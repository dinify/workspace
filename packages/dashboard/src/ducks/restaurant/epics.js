// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, map, catchError, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import R from 'ramda';
import { actionTypes } from 'react-redux-firebase';

import * as API from 'api/restaurant';

export const loggedFetchedAction = payload => {
  if (payload === null) {
    return { type: 'LOGGED_FETCHED_EMPTY' };
  }
  return { type: 'LOGGED_FETCHED_DONE', payload };
};

export const appBootstrap = () => ({ type: 'BOOTSTRAP' });

// Epic
const bootstrapEpic = (action$: Observable) =>
  action$.pipe(
    ofType('persist/REHYDRATE'),
    mergeMap(() => {
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
      {type: 'LOAD_RESTAURANT'},
      {type: 'FETCH_TRANSLATIONS_INIT'}
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

export const signupDoneAction = (payload: object) => {
  //console.log(payload);
  //window.location.replace('/')
  return { type: 'LOGIN_INIT', payload: { ...payload, crRest: true } };
};

export const signupFailAction = (err: Error) => ({
  type: 'SIGNUP_FAIL',
  payload: err,
});

const registrationEpic = (action$, state$) =>
  action$.pipe(
    ofType('SIGNUP_INIT'),
    switchMap(({ payload }) => {
      const { name, phone, email, password, restaurantName, subdomain } = payload;
      const logged = state$.value.restaurant.loggedRestaurant;
      if (!logged) {
        // register new user, log in, create new restaurant
        return from(API.RegisterUser({ name, phone, email, password })).pipe(
          map(() => signupDoneAction({ name, phone, email, password, restaurantName, subdomain })),
          catchError(error => of(signupFailAction(error)))
        )
      }
      // create restaurant
      console.log('logggggggged');
      return of(signupFailAction());
    })
  );

export const loginFailAction = (err: Error) => ({
  type: 'LOGIN_FAIL',
  payload: err,
});

export const FailAction = (err: Error) => ({ type: 'FAIL', payload: err });

export const loginDoneAction = (res: object) => {
  window.location.replace('/settings');
  return { type: 'LOGIN_DONE', payload: res };
};

const loginEpic = (action$) =>
  action$.pipe(
    ofType('LOGIN_INIT'),
    switchMap(({ payload: { email, password, crRest, restaurantName, subdomain } }) => {
      return from(API.LoginUser({ email, password })).pipe(
        map(res => {
          //setCookie('access_token', res.token, 30);
          if (crRest) {
            return {
              type: 'REGISTER_RESTAURANT_INIT',
              payload: { restaurantName, subdomain, email, password },
            };
          }
          return loginDoneAction(res);
        }),
        catchError(error => of(loginFailAction(error)))
      );
    })
  );

export const createRestaurantDoneAction = ({ email, password }) => {
  return { type: 'LOGIN_INIT', payload: { email, password } };
  //return { type: 'CREATE_RESTAURANT_DONE', payload: res }
};

const registerRestaurantEpic = (action$: Observable) =>
  action$.pipe(
    ofType('REGISTER_RESTAURANT_INIT'),
    switchMap(({ payload: { restaurantName, subdomain, email, password } }) => {
      return from(API.CreateRestaurant({ restaurantName, subdomain })).pipe(
        map(() => createRestaurantDoneAction({ email, password })),
        catchError(error => of(loginFailAction(error)))
      );
    })
  );

const reorderEpic = (action$: Observable) =>
  action$.pipe(
    filter(
      action =>
        action.type.startsWith('REORDER_') && action.type.endsWith('_INIT'),
    ),
    mergeMap(({ payload, type }) => {
      const middle = type.split('_')[1]; // 'CATEGORY'

      const changed = [];
      payload.forEach((o, i) => {
        if (o.precedence !== i) changed.push({ ...o, newPrecedence: i });
      });

      return changed
        .map(o => ({
          type: `UPDATE_${middle}_INIT`,
          payload: {
            id: o.id,
            precedence: o.newPrecedence,
          },
        }))
        .concat({
          type: `REORDER_${middle}_DONE`,
        });
    })
  );

const editImageEpic = (action$, state$) =>
  action$.pipe(
    ofType('UPDATE_IMAGE_DONE'),
    switchMap(({ payload: { id } }) => {
      const images = state$.value.restaurant.loggedRestaurant.images;
      const maxPrecedence = R.sort((a, b) => b.precedence - a.precedence)(
        R.values(images),
      )[0].precedence;
      return from(API.EditImage({ id, precedence: maxPrecedence + 1 })).pipe(
        map(res => ({ type: `EDIT_IMAGE_DONE`, payload: res })),
        catchError(error => of({ type: `EDIT_IMAGE_FAIL`, payload: error }))
      );
    })
  )


export default [
  loadRestaurant,
  bootstrapEpic,
  getLoggedEpic,
  loginEpic,
  registrationEpic,
  registerRestaurantEpic,
  reorderEpic,
  editImageEpic,
];
