import { of, from } from 'rxjs';
import { mergeMap, map, catchError, filter, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { push } from 'connected-react-router';
import { reset } from 'redux-form';
import sort from 'ramda/src/sort';
import values from 'ramda/src/values';
import { actionTypes } from 'react-redux-firebase';
import { setCookie, handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';
import { reportCampaignAction } from '@dinify/common/dist/ducks/reporting/actions';
import * as API from '@dinify/common/dist/api/restaurant';
import * as types from './types';
import { selectRestaurant } from './actions';

export const appBootstrap = () => ({ type: 'BOOTSTRAP' });

// Epic
const bootstrapEpic = (action$) =>
  action$.pipe(
    ofType('persist/PERSIST'),
    mergeMap(() => {
      setCookie('lang', 'en', 30);
      return of(appBootstrap());
    })
  );

const selectRestaurantEpic = (action$) =>
  action$.pipe(
    ofType('SELECT_RESTAURANT'),
    mapTo(push('/'))
  );

const getLoggedEpic = (action$, state$) =>
  action$.pipe(
    filter(action => {
      const triggerOn = [actionTypes.LOGIN, actionTypes.AUTH_EMPTY_CHANGE, 'SELECT_RESTAURANT'];
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
        {type: types.FETCH_RESTAURANT_INIT, payload: {
          node: true
        }},
        {type: 'FETCH_LANGUAGES_INIT'},
        {type: 'FETCH_TRANSLATIONS_INIT'},
        {type: 'FETCH_SERVICEIMAGES_INIT'},
        // {type: 'FETCH_RESTAURANTSETTINGS_INIT'},
        {type: 'FETCH_MENULANGUAGES_INIT'}
      );
    })
  );

export const FailAction = (err) => ({ type: 'FAIL', payload: err });

export const createRestaurantDoneAction = ({ email, password }) => {
  return { type: 'LOGIN_INIT', payload: { email, password } };
  // return { type: 'CREATE_RESTAURANT_DONE', payload: res }
};

const middlePromise = (firebase) => new Promise((resolve, reject) => {
  firebase.auth().currentUser.getIdTokenResult(true).then((t) => {
    resolve({ t });
  })
  .catch(reject)
})

const registerRestaurantEpic = (action$, state$, { firebase }) =>
  action$.pipe(
    ofType('REGISTER_RESTAURANT_INIT'),
    mergeMap((action) => {
      const { payload: { restaurantName, subdomain, language } } = action;
      const onboardingToken = state$.value.restaurant.onboardingToken;
      const createRestaurantPayload = { restaurantName, subdomain, language };
      if (onboardingToken) {
        createRestaurantPayload.token = onboardingToken;
      }
      return from(API.CreateRestaurant(createRestaurantPayload)).pipe(
        mergeMap((res) => {
          return from(middlePromise(firebase, res)).pipe(
            mergeMap(({ t }) => {
              setCookie('access_token', t.token, 90);
              return of(
                { type: 'REGISTER_RESTAURANT_DONE', payload: { res } },
                selectRestaurant({ id: res.id }),
                reportCampaignAction({ token: onboardingToken, status: 'restaurant:created'})
              );
            }),
            catchError(error => of({ type: 'REGISTER_RESTAURANT_FAIL', error }))
          );
        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'REGISTER_RESTAURANT_FAIL',
          initAction: action
        }))
      );
    })
  );

const reorderEpic = (action$) =>
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
    mergeMap((action) => {
      const { payload: { res } } = action;
      const { id } = res;
      const selectRestaurant = state$.value.restaurant.selectRestaurant;
      const images = state$.value.restaurant.all[selectRestaurant].images;
      const maxPrecedence = sort((a, b) => b.precedence - a.precedence)(
        values(images),
      )[0].precedence;
      return from(API.EditImage({ id, precedence: maxPrecedence + 1 })).pipe(
        map(res => ({ type:' EDIT_IMAGE_DONE', payload: res })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'EDIT_IMAGE_FAIL',
          initAction: action
        }))
      );
    })
  )

const onUpdateDoneSnackbarsEpic = (action$) =>
  action$.pipe(
    filter(
      action =>
        action.type.startsWith('UPDATE_') && action.type.endsWith('_DONE'),
    ),
    mergeMap(() => {
      return of(snackbar.show({
        message: window.i18nInstance.t('saved'),
      }));
    })
  );

const onUpdateFailSnackbarsEpic = (action$) =>
  action$.pipe(
    filter(
      action =>
        action.type.startsWith('UPDATE_') && action.type.endsWith('_FAIL'),
    ),
    mergeMap(() => {
      return of(snackbar.show({
        message: window.i18nInstance.t('saveFailed'),
      }));
    })
  );

const resetCategoriesEpic = (action$) =>
  action$.pipe(
    ofType('CREATE_MENUCATEGORY_DONE'),
    map(() => reset('menu/createCategory'))
  );

const resetMenuItemEpic = (action$) =>
  action$.pipe(
    ofType('CREATE_MENUITEM_DONE'),
    map(() => reset('menu/createItem'))
  );

const addLangSnackbar = (action$) =>
  action$.pipe(
    filter(
      action =>
        action.type.startsWith('CREATE_MENULANGUAGE'),
    ),
    map(({ type }) => {
      let message = '';
      if (type.endsWith('DONE')) message = 'New language has been added';
      if (type.endsWith('FAIL')) message = 'Adding language failed';
      return snackbar.show({ message });
    })
  );

const publishRestaurantEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.SEND_PUBLISHREQUEST_INIT),
    mergeMap((action) => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      return from(API.SendPublishRequest({ restaurantId })).pipe(
        map(res => ({ type: types.SEND_PUBLISHREQUEST_DONE, payload: res })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: types.SEND_PUBLISHREQUEST_FAIL,
          initAction: action
        }))
      );
    })
  );

export default [
  loadRestaurant,
  bootstrapEpic,
  getLoggedEpic,
  registerRestaurantEpic,
  reorderEpic,
  editImageEpic,
  selectRestaurantEpic,
  onUpdateDoneSnackbarsEpic,
  onUpdateFailSnackbarsEpic,
  resetCategoriesEpic,
  resetMenuItemEpic,
  addLangSnackbar,
  publishRestaurantEpic
];
