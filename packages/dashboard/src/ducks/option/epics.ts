import { from as fromPromise } from 'rxjs';
import { mergeMap, catchError, map as rxMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import * as types from './types';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';
import {
  fetchOptionsAsync,
  createOptionAsync,
  createChoiceAsync,
} from './actions';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { normalize } from 'normalizr';
import { options } from '../menuItem/schemas';
import { snackbarActions as snackbar } from 'material-ui-snackbar-redux';
import { currentT as t } from '@dinify/common/src/lib/i18n/translations';

const fetchOptionsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchOptionsAsync.request)),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const lang = state$.value.restaurant.defaultLanguage;
      return fromPromise(API.GetRestaurantOptions({ restaurantId }, lang)).pipe(
        rxMap((res: any) => {
          const normalized = normalize(res, options);
          return fetchOptionsAsync.success(normalized);
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchOptionsAsync.failure),
            initAction: action,
          });
        }),
      );
    }),
  );

const createOptionEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(createOptionAsync.request)),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;

      const body = {
        name: payload.name,
        restaurantId,
      };
      return fromPromise(API.CreateOption(body)).pipe(
        rxMap((res: any) => {
          return createOptionAsync.success(res);
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(createOptionAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const createChoiceEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(createChoiceAsync.request)),
    mergeMap(action => {
      const payload = action.payload;

      const body = {
        name: payload.name,
        optionId: payload.optionId,
        difference: {
          amount: payload.price,
          currency: 'EUR',
        },
      };
      return fromPromise(API.CreateChoice(body)).pipe(
        rxMap((res: any) => {
          return {
            type: getType(createChoiceAsync.success),
            payload: res,
            meta: body,
          };
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(createChoiceAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const onCreateFailSnackbarsEpic: Epic = action$ =>
  action$.pipe(
    ofType(types.CREATE_OPTION_FAIL),
    rxMap(() =>
      snackbar.show({
        message: t('createOptionFail'),
      }),
    ),
  );

export default [
  fetchOptionsEpic,
  createOptionEpic,
  createChoiceEpic,
  onCreateFailSnackbarsEpic,
];
