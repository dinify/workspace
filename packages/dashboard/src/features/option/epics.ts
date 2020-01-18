import { from as fromPromise } from 'rxjs';
import { mergeMap, catchError, map as rxMap } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { getType } from 'typesafe-actions';
import * as API from '@dinify/common/src/api/v2/restaurant';
import * as actions from './actions';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import { normalize } from 'normalizr';
import { options } from '../menuItem/schemas';

const fetchOptionsEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.fetchOptionsAsync.request)),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const lang = state$.value.restaurant.defaultLanguage;
      return fromPromise(API.GetRestaurantOptions({ restaurantId }, lang)).pipe(
        rxMap((res: any) => {
          const normalized = normalize(res, options);
          return actions.fetchOptionsAsync.success(normalized);
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(actions.fetchOptionsAsync.failure),
            initAction: action,
          });
        }),
      );
    }),
  );

const createOptionEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.createOptionAsync.request)),
    mergeMap(action => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;

      const body = {
        name: payload.name,
        restaurantId,
      };
      return fromPromise(API.CreateOption(body)).pipe(
        rxMap((res: any) => {
          return actions.createOptionAsync.success(res);
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(actions.createOptionAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const removeOptionEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.removeOptionAsync.request)),
    mergeMap(action => {
      const payload = action.payload;
      const { id } = payload;
      return fromPromise(API.RemoveOption({ id })).pipe(
        rxMap((res: any) => {
          return actions.removeOptionAsync.success(res);
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(actions.removeOptionAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const createChoiceEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.createChoiceAsync.request)),
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
            type: getType(actions.createChoiceAsync.success),
            payload: res,
            meta: body,
          };
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(actions.createChoiceAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );

const removeChoiceEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.removeChoiceAsync.request)),
    mergeMap(action => {
      const payload = action.payload;
      const { id } = payload;
      return fromPromise(API.RemoveChoice({ id })).pipe(
        rxMap((res: any) => {
          return actions.removeChoiceAsync.success(res);
        }),
        catchError(error =>
          handleEpicAPIError({
            error,
            failActionType: getType(actions.removeChoiceAsync.failure),
            initAction: action,
          }),
        ),
      );
    }),
  );


export default [
  fetchOptionsEpic,
  createOptionEpic,
  removeOptionEpic,
  createChoiceEpic,
  removeChoiceEpic
];
