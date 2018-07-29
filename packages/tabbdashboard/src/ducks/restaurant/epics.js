// @flow
import { Observable } from 'rxjs';
import R from 'ramda';
import * as FN from 'lib/FN';

import * as API from 'api/restaurant';

export const loggedFetchedAction = payload => {
  if (payload === null) {
    return { type: 'LOGGED_FETCHED_EMPTY' };
  }
  return { type: 'LOGGED_FETCHED_DONE', payload };
};

function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export const appBootstrap = () => ({ type: 'BOOTSTRAP' });

// Epic
const bootstrapEpic = (action$: Observable) =>
  action$.ofType('persist/REHYDRATE').mergeMap(() => {
    return Observable.fromPromise(API.GetLoggedRestaurant())
      .mergeMap(loggedUser => {
        return Observable.of(loggedFetchedAction(loggedUser), appBootstrap(), {
          type: 'FETCH_SERVICEIMAGES_INIT',
        });
      })
      .catch(error => {
        console.log(error);
        if (
          window.location.pathname !== '/login' &&
          window.location.pathname !== '/signup'
        )
          window.location.replace('/login');
        return Observable.of(loggedFetchedAction(null), appBootstrap());
      });
  });

const getLoggedEpic = (action$: Observable) =>
  action$.ofType('GET_LOGGED_INIT').switchMap(() =>
    Observable.fromPromise(API.GetLoggedRestaurant())
      .map(loggedUser => loggedFetchedAction(loggedUser))
      .catch(error => {
        console.log(error);
        if (
          window.location.pathname !== '/login' &&
          window.location.pathname !== '/signup'
        )
          window.location.replace('/login');
        return Observable.of(appBootstrap());
      }),
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

const registrationEpic = (action$: Observable, { getState }) =>
  action$
    .ofType('SIGNUP_INIT')
    .switchMap(
      ({
        payload: { name, phone, email, password, restaurantName, subdomain },
      }) => {
        const logged = getState().restaurant.loggedRestaurant;
        if (!logged) {
          // register new user, log in, create new restaurant
          return Observable.fromPromise(
            API.RegisterUser({ name, phone, email, password }),
          )
            .map(() => signupDoneAction({ name, phone, email, password, restaurantName, subdomain }))
            .catch(error => Observable.of(signupFailAction(error)));
        } else {
          // create restaurant
          console.log('logggggggged');
        }
      },
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

const loginEpic = (action$: Observable, { getState }) =>
  action$
    .ofType('LOGIN_INIT')
    .switchMap(({ payload: { email, password, crRest, restaurantName, subdomain } }) => {
      return Observable.fromPromise(API.LoginUser({ email, password }))
        .map(res => {
          setCookie('access_token', res.token, 30);
          if (crRest) {
            return {
              type: 'REGISTER_RESTAURANT_INIT',
              payload: { restaurantName, subdomain, email, password },
            };
          } else {
            return loginDoneAction(res);
          }
        })
        .catch(error => Observable.of(loginFailAction(error)));
    });

export const createRestaurantDoneAction = ({ email, password }) => {
  return { type: 'LOGIN_INIT', payload: { email, password } };
  //return { type: 'CREATE_RESTAURANT_DONE', payload: res }
};

const registerRestaurantEpic = (action$: Observable, { getState }) =>
  action$
    .ofType('REGISTER_RESTAURANT_INIT')
    .switchMap(({ payload: { restaurantName, subdomain, email, password } }) => {
      return Observable.fromPromise(API.CreateRestaurant({ restaurantName, subdomain }))
        .map(() => createRestaurantDoneAction({ email, password }))
        .catch(error => Observable.of(loginFailAction(error)));
    });

const assignEpic = (action$: Observable) =>
  action$
    .filter(
      action =>
        action.type.startsWith('ASSIGN_') && action.type.endsWith('_INIT'),
    )
    .switchMap(({ payload, type }) => {
      const middle = type.split('_')[1]; // INGREDIENT-FOOD
      const assignTo = middle.split('-')[1]; // FOOD

      const originalObjectKey = R.keys(payload.originalObject)[0]; // 'ingredients'
      const originalObject = payload.originalObject[originalObjectKey]; // map of ingredients

      const singular = originalObjectKey.slice(0, -1); // 'ingredient'
      const assignedEntity = payload[singular]; // object of ingredient

      const newObject = R.assoc(assignedEntity.id, assignedEntity)(
        originalObject,
      ); // original with new entity

      let updatePayload = {};
      updatePayload[originalObjectKey] = FN.MapToList(newObject);
      updatePayload.id = payload.id; // foodId

      return Observable.of({
        type: `UPDATE_${assignTo}_INIT`,
        payload: updatePayload,
      });
    });

const unassignEpic = (action$: Observable) =>
  action$
    .filter(
      action =>
        action.type.startsWith('UNASSIGN_') && action.type.endsWith('_INIT'),
    )
    .switchMap(({ payload, type }) => {
      const middle = type.split('_')[1]; // INGREDIENT-FOOD
      const assignTo = middle.split('-')[1]; // FOOD

      const originalObjectKey = R.keys(payload.originalObject)[0]; // 'ingredients'
      const originalObject = payload.originalObject[originalObjectKey]; // map of ingredients

      const singular = originalObjectKey.slice(0, -1); // 'ingredient'

      // original without dissociated entity
      const newObject = R.dissoc(payload[`${singular}Id`])(originalObject);

      let updatePayload = {};
      updatePayload[originalObjectKey] = FN.MapToList(newObject);
      updatePayload.id = payload.id; // id of main entity

      return Observable.of({
        type: `UPDATE_${assignTo}_INIT`,
        payload: updatePayload,
      });
    });

const reorderEpic = (action$: Observable) =>
  action$
    .filter(
      action =>
        action.type.startsWith('REORDER_') && action.type.endsWith('_INIT'),
    )
    .mergeMap(({ payload, type }) => {
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
    });

const editImageEpic = (action$: Observable, { getState }) =>
  action$.ofType('UPDATE_IMAGE_DONE').switchMap(({ payload: { id } }) => {
    const images = getState().restaurant.loggedRestaurant.images;
    const maxPrecedence = R.sort((a, b) => b.precedence - a.precedence)(
      R.values(images),
    )[0].precedence;
    return Observable.fromPromise(
      API.EditImage({ id, precedence: maxPrecedence + 1 }),
    )
      .map(res => ({ type: `EDIT_IMAGE_DONE`, payload: res }))
      .catch(error =>
        Observable.of({ type: `EDIT_IMAGE_FAIL`, payload: error }),
      );
  });

export default [
  bootstrapEpic,
  getLoggedEpic,
  loginEpic,
  registrationEpic,
  registerRestaurantEpic,
  assignEpic,
  unassignEpic,
  reorderEpic,
  editImageEpic,
];
