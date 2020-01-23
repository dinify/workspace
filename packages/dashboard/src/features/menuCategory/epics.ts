import { from as fromPromise } from 'rxjs';
import { ofType, Epic } from 'redux-observable';
import { getType } from 'typesafe-actions';
import { normalize } from 'normalizr';
import { menuCategories } from './schemas';

import { mergeMap, map, catchError, filter, map as rxMap} from 'rxjs/operators';
import * as API from '@dinify/common/src/api/v2/restaurant';
import pick from 'ramda/es/pick';
import * as actions from './actions';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';


const fetchMenuCategoriesEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.fetchMenuCategoriesAsync.request)),
    mergeMap((action) => {
      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const lang = state$.value.restaurant.defaultLanguage;
      return fromPromise(API.GetMenuCategories({ restaurantId }, lang)).pipe(
        filter((res: any) => !!res),
        rxMap((res: any) => {
          const normalized: any = normalize(res, menuCategories);
          return actions.fetchMenuCategoriesAsync.success(normalized);
        }),
        catchError(error => {
          return handleEpicAPIError({
            error,
            failActionType: getType(actions.fetchMenuCategoriesAsync.failure),
            initAction: action
          })
        })
      );
    })
  );

const createMenuCategoryEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.createMenuCategoryAsync.request)),
    mergeMap((action) => {

      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;

      const body = {
        ...pick(['precedence', 'name'], payload),
        restaurantId
      };

      return fromPromise(API.CreateMenuCategory(body)).pipe(
        map((res) => ({
          type: getType(actions.createMenuCategoryAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.createMenuCategoryAsync.failure),
          initAction: action
        }))
      );
    })
  );

const updateMenuCategoryEpic: Epic = (action$) =>
  action$.pipe(
    ofType(getType(actions.updateMenuCategoryAsync.request)),
    mergeMap((action) => {

      const payload = action.payload;

      return fromPromise(API.UpdateMenuCategory(payload)).pipe(
        map((res) => ({
          type: getType(actions.updateMenuCategoryAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.updateMenuCategoryAsync.failure),
          initAction: action
        }))
      );
    })
  );

const deleteMenuCategoryEpic: Epic = (action$, $) =>
  action$.pipe(
    ofType(getType(actions.removeMenuCategoryAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const id = payload;

      return fromPromise(API.RemoveMenuCategory(id)).pipe(
        map((res) => ({
          type: getType(actions.removeMenuCategoryAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.removeMenuCategoryAsync.failure),
          initAction: action
        }))
      );
    })
  );

const reorderEpic: Epic = action$ =>
  action$.pipe(
    ofType(getType(actions.reorderCategoriesAsync.request)),
    mergeMap(({ payload }) => {

      const changed: any = [];
      payload.forEach((o: any, i: number) => {
        if (o.precedence !== i) changed.push({ ...o, newPrecedence: i });
      });

      return changed
        .map((o: any) => actions.updateMenuCategoryAsync.request({
          id: o.id,
          precedence: o.newPrecedence,
        }))
        .concat({
          type: getType(actions.reorderCategoriesAsync.success),
        });
    }),
  );

export default [
  fetchMenuCategoriesEpic,
  createMenuCategoryEpic,
  updateMenuCategoryEpic,
  deleteMenuCategoryEpic,
  reorderEpic
];
