import { of, from } from 'rxjs';
import { mergeMap, map, catchError, filter, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { getType } from 'typesafe-actions';
import { push } from 'connected-react-router';
import { reset } from 'redux-form';
import { actionTypes } from 'react-redux-firebase';
import { setCookie, handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';
import { reportCampaignAction } from '@dinify/common/src/features/reporting/actions';
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import * as types from './types';
import * as actions from './actions';
import { currentT as t } from '@dinify/common/src/lib/i18n/translations';

export const appBootstrap = () => ({ type: 'BOOTSTRAP' });

// Epic
const bootstrapEpic = action$ =>
  action$.pipe(
    ofType('persist/PERSIST'),
    mergeMap(() => {
      setCookie('lang', 'en', 30);
      return of(appBootstrap());
    }),
  );

const fetchRestaurantEpic = (action$) =>
  action$.pipe(
    ofType(getType(actions.fetchRestaurantAsync.request)),
    mergeMap((action) => from(API.GetRestaurantById({ 
      restaurantId: action.payload.restaurantId
    })).pipe(
      map((res) => {
        return actions.fetchRestaurantAsync.success(res);
      }),
      catchError(error => {
        return handleEpicAPIError({
          error,
          failActionType: getType(actions.fetchRestaurantAsync.failure),
          initAction: action
        })
      })
    ))
  );

const selectRestaurantEpic = action$ =>
  action$.pipe(
    ofType('SELECT_RESTAURANT'),
    mapTo(push('/')),
  );

const getLoggedEpic = (action$, state$) =>
  action$.pipe(
    filter(action => {
      const triggerOn = [
        actionTypes.LOGIN,
        actionTypes.AUTH_EMPTY_CHANGE,
        'SELECT_RESTAURANT',
      ];
      return triggerOn.includes(action.type);
    }),
    mergeMap(() => {
      const reactions = [actions.fetchManagedAsync.request()];
      const selectedRestaurant = state$.value.restaurant.selectedRestaurant;
      if (selectedRestaurant) reactions.push({ type: 'LOAD_RESTAURANT' });
      return reactions;
    }),
  );

const getManagedEpic = (action$) =>
  action$.pipe(
    ofType(getType(actions.fetchManagedAsync.request)),
    mergeMap((action) => {
      return from(API.GetManagedRestaurants()).pipe(
        map(actions.fetchManagedAsync.success),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(actions.fetchManagedAsync.failure),
            initAction: action,
          }),
        ),
      );
    })
  );

const loadRestaurant = (action$, state$) =>
  action$.pipe(
    ofType('LOAD_RESTAURANT'),
    mergeMap(() => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      return of(
        actions.fetchRestaurantAsync.request({ restaurantId }),
        { type: 'FETCH_LANGUAGES_INIT' },
        { type: 'FETCH_TRANSLATIONS_INIT' },
        { type: 'GET_SERVICEIMAGES_INIT' },
        { type: 'FETCH_MENULANGUAGES_INIT' },
      );
    }),
  );

export const FailAction = err => ({ type: 'FAIL', payload: err });

export const createRestaurantDoneAction = ({ email, password }) => {
  return { type: 'LOGIN_INIT', payload: { email, password } };
  // return { type: 'CREATE_RESTAURANT_DONE', payload: res }
};

const middlePromise = firebase =>
  new Promise((resolve, reject) => {
    firebase
      .auth()
      .currentUser.getIdTokenResult(true)
      .then(t => {
        resolve({ t });
      })
      .catch(reject);
  });

const registerRestaurantEpic = (action$, state$, { firebase }) =>
  action$.pipe(
    ofType('REGISTER_RESTAURANT_INIT'),
    mergeMap(action => {
      const {
        payload: { restaurantName, subdomain, language, currency },
      } = action;
      const onboardingToken = state$.value.restaurant.onboardingToken;
      const createRestaurantPayload = {
        name: restaurantName,
        subdomain,
        language,
        currency
      };
      if (onboardingToken) {
        createRestaurantPayload.token = onboardingToken;
      }
      return from(API.CreateRestaurant(createRestaurantPayload)).pipe(
        mergeMap(res => {
          return from(middlePromise(firebase, res)).pipe(
            mergeMap(({ t }) => {
              setCookie('access_token', t.token, 90);
              return of(
                { type: 'REGISTER_RESTAURANT_DONE', payload: { res } },
                actions.selectRestaurant({ id: res.id }),
                reportCampaignAction({
                  token: onboardingToken,
                  status: 'restaurant:created',
                }),
              );
            }),
            catchError(error =>
              of({ type: 'REGISTER_RESTAURANT_FAIL', error }),
            ),
          );
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: 'REGISTER_RESTAURANT_FAIL',
            initAction: action,
          }),
        ),
      );
    }),
  );

const uploadMainImageEpic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.uploadMainImageAsync.request)),
    mergeMap((action) => {

      const payload = action.payload;

      const { file } = payload;
      const id = state$.value.restaurant.selectedRestaurant;

      return from(API.UploadRestaurantImage({ file, id })).pipe(
        map((res) => ({
          type: getType(actions.uploadMainImageAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.uploadMainImageAsync.failure),
          initAction: action
        }))
      );
    })
  );

const updateRestaurantEpic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.updateRestaurantAsync.request)),
    mergeMap(action => {
      const restaurant = {
        id: state$.value.restaurant.selectedRestaurant,
        ...action.payload
      };
      return from(API.UpdateRestaurant(restaurant)).pipe(
        map(res => {
          return actions.updateRestaurantAsync.success(res);
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(actions.updateRestaurantAsync.failure),
            initAction: action,
          }),
        ),
      );
    })
  );

const onUpdateDoneSnackbarsEpic = action$ =>
  action$.pipe(
    filter(
      action =>
        action.type.includes('UPD_') && action.type.endsWith('_DONE'),
    ),
    mergeMap(() => {
      return of(
        snackbar.show({
          message: t('saved'),
        }),
      );
    }),
  );

const onUpdateFailSnackbarsEpic = action$ =>
  action$.pipe(
    filter(
      action =>
        action.type.includes('UPD_') && action.type.endsWith('_FAIL'),
    ),
    mergeMap(() => {
      return of(
        snackbar.show({
          message: t('saveFailed'),
        }),
      );
    }),
  );

const resetCategoriesEpic = action$ =>
  action$.pipe(
    ofType('CREATE_MENUCATEGORY_DONE'),
    map(() => reset('menu/createCategory')),
  );

const resetMenuItemEpic = action$ =>
  action$.pipe(
    ofType('CREATE_MENUITEM_DONE'),
    map(() => reset('menu/createItem')),
  );

const addLangSnackbar = action$ =>
  action$.pipe(
    filter(action => action.type.includes('CREATE_MENULANGUAGE')),
    map(({ type }) => {
      let message = '';
      if (type.endsWith('DONE')) message = 'New language has been added';
      if (type.endsWith('FAIL')) message = 'Adding language failed';
      return snackbar.show({ message });
    }),
  );

const publishRestaurantEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.SEND_PUBLISHREQUEST_INIT),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const subdomain = state$.value.restaurant.all[restaurantId].subdomain;
      return from(API.SendPublishRequest({ subdomain })).pipe(
        map(res => ({ type: types.SEND_PUBLISHREQUEST_DONE, payload: res })),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: types.SEND_PUBLISHREQUEST_FAIL,
            initAction: action,
          }),
        ),
      );
    }),
  );

const onUpdateWifiSnackbarsEpic = action$ =>
  action$.pipe(
    ofType('UPD_WIFI_INIT'),
    mergeMap(() => {
      return of(
        snackbar.show({
          message: t('saved'),
        }),
      );
    }),
  );

export default [
  fetchRestaurantEpic,
  getManagedEpic,
  loadRestaurant,
  updateRestaurantEpic,
  bootstrapEpic,
  getLoggedEpic,
  registerRestaurantEpic,
  uploadMainImageEpic,
  selectRestaurantEpic,
  onUpdateDoneSnackbarsEpic,
  onUpdateFailSnackbarsEpic,
  resetCategoriesEpic,
  resetMenuItemEpic,
  addLangSnackbar,
  publishRestaurantEpic,
  onUpdateWifiSnackbarsEpic,
];
