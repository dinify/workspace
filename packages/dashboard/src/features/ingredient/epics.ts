import { from as fromPromise, of } from 'rxjs';
import { mergeMap, map, catchError, map as rxMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';
import {
  fetchIngredientsAsync, createIngredientAsync, removeIngredientAsync
} from './actions';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { currentT as t } from '@dinify/common/src/lib/i18n/translations';

import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';
import { getDefaultLanguage } from '../restaurant/selectors';
import { findIngredientByName } from './selectors';

const fetchIngredientsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchIngredientsAsync.request)),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const lang = getDefaultLanguage(state$.value);
      return fromPromise(
        API.GetRestaurantIngredients({ restaurantId }, lang),
      ).pipe(
        rxMap((res: any) => {
          return fetchIngredientsAsync.success(res);
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchIngredientsAsync.failure),
            initAction: action,
          });
        }),
      );
    }),
  );

const createIngredientEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(createIngredientAsync.request)),
    mergeMap(action => {
      const payload = action.payload;
      const { name } = payload;
      const existing = findIngredientByName(state$.value, name);
      if (existing) {
        return of(createIngredientAsync.failure({
          errorType: 'ingredient-unique-name'
        }));
      }
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const body = {
        name,
        restaurantId,
      };
      return fromPromise(API.CreateIngredient(body)).pipe(
        rxMap((res: any) => {
          return createIngredientAsync.success(res);
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(createIngredientAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const onCreateFailSnackbarEpic: Epic = action$ =>
  action$.pipe(
    ofType(getType(createIngredientAsync.failure)),
    map(() =>
      snackbar.show({
        message: `${t('createIngredientFail')}. Ingredient already exists.`, // TODO Translation
      }),
    ),
  );

const removeIngredientEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(removeIngredientAsync.request)),
    mergeMap(action => {
      const payload = action.payload;

      return fromPromise(API.RemoveIngredient({ id: payload.id })).pipe(
        rxMap((res: any) => {
          return removeIngredientAsync.success(res);
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(removeIngredientAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const onRemoveFailSnackbarEpic: Epic = action$ =>
  action$.pipe(
    ofType(getType(removeIngredientAsync.failure)),
    map(() =>
      snackbar.show({
        message: `Ingredient cannot be removed.`, // TODO Translation
      }),
    ),
  );

export default [
  fetchIngredientsEpic,
  createIngredientEpic,
  removeIngredientEpic,
  onCreateFailSnackbarEpic,
  onRemoveFailSnackbarEpic
];
