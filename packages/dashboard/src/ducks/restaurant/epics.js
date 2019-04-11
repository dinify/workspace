// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, switchMap, map, catchError, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as R from 'ramda';
import { actionTypes } from 'react-redux-firebase';
import { setCookie } from '@dinify/common/dist/lib/FN';
import { selectRestaurant } from './actions';

import * as API from '@dinify/common/dist/api/restaurant';

export const appBootstrap = () => ({ type: 'BOOTSTRAP' });

// Epic
const bootstrapEpic = (action$: Observable) =>
  action$.pipe(
    ofType('persist/REHYDRATE'),
    mergeMap(() => {
      setCookie('lang', 'en', 30);
      return of(appBootstrap());
    })
  );

const selectRestaurantEpic = (action$: Observable) =>
  action$.pipe(
    ofType('SELECT_RESTAURANT'),
    mergeMap(() => {
      window.location.href = '/';
      return of({ type: 'SELECT_RESTAURANT_REDIRECT' });
    })
  );

const getLoggedEpic = (action$, state$) =>
  action$.pipe(
    filter(action => {
      const triggerOn = [actionTypes.LOGIN, actionTypes.AUTH_EMPTY_CHANGE];
      return triggerOn.includes(action.type);
    }),
    mergeMap(() => {
      const reactions = [{type: 'FETCH_MANAGEDRESTAURANTS_INIT'}];
      const selectedRestaurant = state$.value.restaurant.selectedRestaurant;
      if (selectedRestaurant) reactions.push({type: 'LOAD_RESTAURANT'});
      return reactions;
    })
  );

const loadRestaurant = (action$) =>
  action$.pipe(
    ofType('LOAD_RESTAURANT'),
    mergeMap(() => {
      return of(
        {type: 'FETCH_LOGGEDRESTAURANT_INIT'},
        {type: 'FETCH_TRANSLATIONS_INIT'},
        {type: 'FETCH_SERVICEIMAGES_INIT'}
      );
    })
  );

export const FailAction = (err: Error) => ({ type: 'FAIL', payload: err });

export const createRestaurantDoneAction = ({ email, password }) => {
  return { type: 'LOGIN_INIT', payload: { email, password } };
  //return { type: 'CREATE_RESTAURANT_DONE', payload: res }
};

const middlePromise = (getFirebase, res) => new Promise((resolve, reject) => {
  getFirebase().auth().currentUser.getIdTokenResult(true).then((t) => {
    resolve({ t, res });
  })
  .catch(reject)
})

const registerRestaurantEpic = (action$, state$, { getFirebase }) =>
  action$.pipe(
    ofType('REGISTER_RESTAURANT_INIT'),
    switchMap(
      ({ payload: { restaurantName, subdomain } }) => from(API.CreateRestaurant({ restaurantName, subdomain })),
      (action, res) => (res)
    ),
    switchMap(
      (res) => from(middlePromise(getFirebase, res)),
    ),
    mergeMap(({t, res}) => {
      setCookie('access_token', t.token, 90);
      return of(
        { type: 'REGISTER_RESTAURANT_DONE', payload: { res } },
        selectRestaurant({ id: res.id })
      );
    }),
    catchError(error => of({ type: 'REGISTER_RESTAURANT_FAIL', error }))
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
  registerRestaurantEpic,
  reorderEpic,
  editImageEpic,
  selectRestaurantEpic
];
