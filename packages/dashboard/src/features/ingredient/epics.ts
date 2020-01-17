import { from as fromPromise } from 'rxjs';
import { mergeMap, map, catchError, map as rxMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';
import {
  fetchIngredientsAsync, createIngredientAsync, removeIngredientAsync
} from './actions';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import pick from 'ramda/es/pick';
import { currentT as t } from '@dinify/common/src/lib/i18n/translations';

import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';

const fetchIngredientsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchIngredientsAsync.request)),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const lang = state$.value.restaurant.defaultLanguage;
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
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;

      const body = {
        ...pick(['name'], payload),
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

const onCreateFailSnackbarsEpic: Epic = action$ =>
  action$.pipe(
    ofType(getType(removeIngredientAsync.failure)),
    map(() =>
      snackbar.show({
        message: t('createIngredientFail'),
      }),
    ),
  );

export default [
  fetchIngredientsEpic,
  createIngredientEpic,
  removeIngredientEpic,
  onCreateFailSnackbarsEpic,
];
