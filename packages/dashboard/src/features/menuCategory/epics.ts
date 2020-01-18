import { from as fromPromise } from 'rxjs';
import { ofType, Epic } from 'redux-observable';
import { getType } from 'typesafe-actions';
import { normalize } from 'normalizr';
import { menuCategories } from './schemas';

import { mergeMap, map, catchError, filter, map as rxMap} from 'rxjs/operators';
import * as API from '@dinify/common/src/api/v2/restaurant';
import pick from 'ramda/es/pick';
import {
  fetchMenuCategoriesAsync,
  createMenuCategoryAsync,
  updateMenuCategoryAsync,
  removeMenuCategoryAsync
} from './actions';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';


const fetchMenuCategoriesEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchMenuCategoriesAsync.request)),
    mergeMap((action) => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const lang = state$.value.restaurant.defaultLanguage;
      return fromPromise(API.GetMenuCategories({ restaurantId }, lang)).pipe(
        filter((res: any) => !!res),
        rxMap((res: any) => {
          const normalized: any = normalize(res, menuCategories);
          return fetchMenuCategoriesAsync.success(normalized);
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(fetchMenuCategoriesAsync.failure),
            initAction: action
          })
        })
      );
    })
  );

const createMenuCategoryEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(createMenuCategoryAsync.request)),
    mergeMap((action) => {

      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;

      const body = {
        ...pick(['precedence', 'name'], payload),
        restaurantId
      };

      return fromPromise(API.CreateMenuCategory(body)).pipe(
        map((res) => ({
          type: getType(createMenuCategoryAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(createMenuCategoryAsync.failure),
          initAction: action
        }))
      );
    })
  );

const updateMenuCategoryEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(updateMenuCategoryAsync.request)),
    mergeMap((action) => {

      const payload = action.payload;

      return fromPromise(API.UpdateMenuCategory(payload)).pipe(
        map((res) => ({
          type: getType(updateMenuCategoryAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(updateMenuCategoryAsync.failure),
          initAction: action
        }))
      );
    })
  );

const deleteMenuCategoryEpic: Epic = (action$, $) =>
  action$.pipe(
    ofType(getType(removeMenuCategoryAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const id = payload;

      return fromPromise(API.RemoveMenuCategory(id)).pipe(
        map((res) => ({
          type: getType(removeMenuCategoryAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(removeMenuCategoryAsync.failure),
          initAction: action
        }))
      );
    })
  );

export default [
  fetchMenuCategoriesEpic,
  createMenuCategoryEpic,
  updateMenuCategoryEpic,
  deleteMenuCategoryEpic
];
