import { from as fromPromise, of } from 'rxjs';
import { mergeMap, map, catchError, map as rxMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { fetchAddonsAsync, createAddonAsync, removeAddonAsync } from './actions';
import { currentT as t } from '@dinify/common/src/lib/i18n/translations';

import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';
import { getDefaultCurrency, getDefaultLanguage } from '../restaurant/selectors';
import { findAddonByName } from './selectors';

const fetchAddonsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchAddonsAsync.request)),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const lang = getDefaultLanguage(state$.value);
      return fromPromise(API.GetRestaurantAddons({ restaurantId }, lang)).pipe(
        rxMap((res: any) => {
          return fetchAddonsAsync.success(res);
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchAddonsAsync.failure),
            initAction: action,
          });
        }),
      );
    }),
  );

const createAddonEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(createAddonAsync.request)),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;
      const { name, price } = payload;

      const existing = findAddonByName(state$.value, name);
      if (existing) {
        return of(createAddonAsync.failure({
          errorType: 'addon-unique-name'
        }));
      }

      const currency = getDefaultCurrency(state$.value);
      const body = {
        name,
        price: {
          amount: price,
          currency
        },
        maximum: '1',
        restaurantId,
      };
      return fromPromise(API.CreateAddon(body)).pipe(
        rxMap((res: any) => {
          return createAddonAsync.success(res);
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(createAddonAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const onCreateFailSnackbarEpic: Epic = action$ =>
  action$.pipe(
    ofType(getType(createAddonAsync.failure)),
    map(() =>
      snackbar.show({
        message: `${t('createAddonFail')}. Addon already exists.`, // TODO Translation
      }),
    ),
  );

const removeAddonEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(removeAddonAsync.request)),
    mergeMap(action => {
      const payload = action.payload;

      return fromPromise(API.RemoveAddon({ id: payload.id })).pipe(
        rxMap((res: any) => {
          return removeAddonAsync.success(res);
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(removeAddonAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const onRemoveFailSnackbarEpic: Epic = action$ =>
  action$.pipe(
    ofType(getType(removeAddonAsync.failure)),
    map(() =>
      snackbar.show({
        message: `Remove failed`, // TODO Translation
      }),
    ),
  );

  
export default [
  fetchAddonsEpic,
  createAddonEpic,
  removeAddonEpic,
  onCreateFailSnackbarEpic,
  onRemoveFailSnackbarEpic
];
