import { from as fromPromise } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import pick from 'ramda/es/pick';
import { handleEpicAPIError } from '@dinify/common/src/lib/FN';
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import { getType } from 'typesafe-actions';
import * as actions from './actions';
import { normalize } from 'normalizr';
import { menuItem } from './schemas.ts';
import { getDefaultLanguage } from '../restaurant/selectors';

const fetchMenuItemEpic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.fetchMenuItemAsync.request)),
    mergeMap((action) => {
      const { id } = action.payload;

      const lang = getDefaultLanguage(state$.value);

      return fromPromise(API.GetMenuItem({ menuItemId: id }, lang)).pipe(
        map((res) => {
          const normalized = normalize(res, menuItem);

          return actions.fetchMenuItemAsync.success(normalized);
        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.fetchMenuItemAsync.failure),
          initAction: action
        }))
      );
    })
  );

const createMenuItemEpic = (action$, state$) =>
  action$.pipe(
    ofType(getType(actions.createMenuItemAsync.request)),
    mergeMap((action) => {

      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;

      const body = {
        ...pick(['precedence', 'name', 'menuCategoryId', 'price'], payload),
        restaurantId
      };

      return fromPromise(API.CreateMenuItem(body)).pipe(
        map((res) => ({
          type: getType(actions.createMenuItemAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.createMenuItemAsync.failure),
          initAction: action
        }))
      );
    })
  );

const updateMenuItemEpic = (action$) =>
  action$.pipe(
    ofType(getType(actions.updateMenuItemAsync.request)),
    mergeMap((action) => {

      const payload = action.payload;

      const body = pick(['name', 'description', 'price', 'published'], payload);

      const menuItemId = payload.menuItemId;

      return fromPromise(API.UpdateMenuItem(menuItemId, body)).pipe(
        map((res) => ({
          type: getType(actions.updateMenuItemAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.updateMenuItemAsync.failure),
          initAction: action
        }))
      );
    })
  );

const deleteMenuItemEpic = (action$) =>
  action$.pipe(
    ofType(getType(actions.removeMenuItemAsync.request)),
    mergeMap((action) => {

      const { payload } = action;

      const { menuItemId } = payload;

      return fromPromise(API.RemoveMenuItem(menuItemId)).pipe(
        map((res) => ({
          type: getType(actions.removeMenuItemAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.removeMenuItemAsync.failure),
          initAction: action
        }))
      );
    })
  );

export const assignIngredientEpic = (action$) => 
  action$.pipe(
    ofType(getType(actions.assignIngredientAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, ingredientId } = payload;

      const body = {
        ingredientId,
        published: true,
        excludable: false
      }

      return fromPromise(API.AssignIngredient(menuItemId, body)).pipe(
        map((res) => ({
          type: getType(actions.assignIngredientAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.assignIngredientAsync.failure),
          initAction: action
        }))
      );
    })
  );

export const unassignIngredientEpic = (action$) => 
  action$.pipe(
    ofType(getType(actions.unassignIngredientAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, ingredientId } = payload;

      return fromPromise(API.UnassignIngredient(menuItemId, { ingredientId })).pipe(
        map((res) => ({
          type: getType(actions.unassignIngredientAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.unassignIngredientAsync.failure),
          initAction: action
        }))
      );
    })
  );

export const setIngredientExcludabilityEpic = (action$) =>
  action$.pipe(
    ofType(getType(actions.setIngredientExcludabilityAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, ingredientId, excludable } = payload;

      const body = {
        excludable
      }

      return fromPromise(API.UpdateMenuItemIngredient(menuItemId, ingredientId, body)).pipe(
        map((res) => ({
          type: getType(actions.setIngredientExcludabilityAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.setIngredientExcludabilityAsync.failure),
          initAction: action
        }))
      );
    })    
  )

export const assignAddonEpic = (action$) => 
  action$.pipe(
    ofType(getType(actions.assignAddonAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, addonId } = payload;

      const body = {
        addonId,
        published: true,
        excludable: false
      }

      return fromPromise(API.AssignAddon(menuItemId, body)).pipe(
        map((res) => ({
          type: getType(actions.assignAddonAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.assignAddonAsync.failure),
          initAction: action
        }))
      );
    })
  );

export const unassignAddonEpic = (action$) => 
  action$.pipe(
    ofType(getType(actions.unassignAddonAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, addonId } = payload;

      return fromPromise(API.UnassignAddon(menuItemId, { addonId })).pipe(
        map((res) => ({
          type: getType(actions.unassignAddonAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.unassignAddonAsync.failure),
          initAction: action
        }))
      );
    })
  );


export const assignOptionEpic = (action$) => 
  action$.pipe(
    ofType(getType(actions.assignOptionAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, optionId } = payload;

      const body = {
        optionId,
        published: true
      }

      return fromPromise(API.AssignOption(menuItemId, body)).pipe(
        map((res) => ({
          type: getType(actions.assignOptionAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.assignOptionAsync.failure),
          initAction: action
        }))
      );
    })
  );

export const unassignOptionEpic = (action$) => 
  action$.pipe(
    ofType(getType(actions.unassignOptionAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, optionId } = payload;

      return fromPromise(API.UnassignOption(menuItemId, { optionId })).pipe(
        map((res) => ({
          type: getType(actions.unassignOptionAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.unassignOptionAsync.failure),
          initAction: action
        }))
      );
    })
  );

const reorderEpic = action$ =>
  action$.pipe(
    ofType(getType(actions.reorderItemsAsync.request)),
    mergeMap(({ payload }) => {

      const changed = [];
      payload.forEach((o, i) => {
        if (o.precedence !== i) changed.push({ ...o, newPrecedence: i });
      });

      return changed
        .map(o => actions.updateMenuItemAsync.request({
          menuItemId: o.id,
          precedence: o.newPrecedence,
        }))
        .concat({
          type: getType(actions.reorderItemsAsync.success),
        });
    }),
  );

const uploadItemImageEpic = (action$) =>
  action$.pipe(
    ofType(getType(actions.uploadItemImageAsync.request)),
    mergeMap((action) => {

      const payload = action.payload;

      const { file, id } = payload;

      return fromPromise(API.UploadMenuItemImage({ file, id })).pipe(
        map((res) => ({
          type: getType(actions.uploadItemImageAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(actions.uploadItemImageAsync.failure),
          initAction: action
        }))
      );
    })
  );

export default [
  fetchMenuItemEpic,
  createMenuItemEpic,
  deleteMenuItemEpic,
  updateMenuItemEpic,
  assignIngredientEpic,
  unassignIngredientEpic,
  setIngredientExcludabilityEpic,
  assignAddonEpic,
  unassignAddonEpic,
  assignOptionEpic,
  unassignOptionEpic,
  reorderEpic,
  uploadItemImageEpic
];
