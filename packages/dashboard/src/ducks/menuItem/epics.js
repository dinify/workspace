import { from as fromPromise, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import findIndex from 'ramda/es/findIndex';
import propEq from 'ramda/es/propEq';
import pipe from 'ramda/es/pipe';
import filter from 'ramda/es/filter';
import assoc from 'ramda/es/assoc';
import pick from 'ramda/es/pick';

import assocPath from 'ramda/es/assocPath';
import { ListToMap, handleEpicAPIError } from '@dinify/common/src/lib/FN';
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import { getType } from 'typesafe-actions';
import { fetchMenuItemAsync, createMenuItemAsync, updateMenuItemAsync, assignIngredientAsync, unassignIngredientAsync, assignAddonAsync, unassignAddonAsync, assignOptionAsync, unassignOptionAsync } from './actions';
import { normalize } from 'normalizr';
import * as types from './types';
import { menuItem } from './schemas.ts';

const fetchMenuItemEpic = (action$, state$) =>
  action$.pipe(
    ofType(getType(fetchMenuItemAsync.request)),
    mergeMap((action) => {
      const { id } = action.payload;

      const lang = state$.value.restaurant.defaultLanguage;

      return fromPromise(API.GetMenuItem({ menuItemId: id }, lang)).pipe(
        map((res) => {
          const normalized = normalize(res, menuItem);

          return fetchMenuItemAsync.success(normalized);
        }),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(fetchMenuItemAsync.failure),
          initAction: action
        }))
      );
    })
  );

const createMenuItemEpic = (action$, state$) =>
  action$.pipe(
    ofType(getType(createMenuItemAsync.request)),
    mergeMap((action) => {

      const restaurantId = state$.value.restaurant.selectedRestaurant;
      const payload = action.payload;

      const body = {
        ...pick(['precedence', 'name', 'menuCategoryId', 'price'], payload),
        restaurantId
      };

      return fromPromise(API.CreateMenuItem(body)).pipe(
        map((res) => ({
          type: getType(createMenuItemAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(createMenuItemAsync.failure),
          initAction: action
        }))
      );
    })
  );

const updateMenuItemEpic = (action$) =>
  action$.pipe(
    ofType(getType(updateMenuItemAsync.request)),
    mergeMap((action) => {

      const payload = action.payload;

      const body = pick(['name', 'description', 'price'], payload);

      const menuItemId = payload.menuItemId;

      return fromPromise(API.UpdateMenuItem(menuItemId, body)).pipe(
        map((res) => ({
          type: getType(updateMenuItemAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(updateMenuItemAsync.failure),
          initAction: action
        }))
      );
    })
  );

export const assignIngredientEpic = (action$) => 
  action$.pipe(
    ofType(getType(assignIngredientAsync.request)),
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
          type: getType(assignIngredientAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(assignIngredientAsync.failure),
          initAction: action
        }))
      );
    })
  );

export const unassignIngredientEpic = (action$) => 
  action$.pipe(
    ofType(getType(unassignIngredientAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, ingredientId } = payload;

      return fromPromise(API.UnassignIngredient(menuItemId, { ingredientId })).pipe(
        map((res) => ({
          type: getType(unassignIngredientAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(unassignIngredientAsync.failure),
          initAction: action
        }))
      );
    })
  );

export const setIngredientExcludabilityEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.SET_INGREDIENT_EXCLUDABILITY_INIT),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, ingredientId, excludable } = payload;
      const ingredient = state$.value.ingredient.all[ingredientId];
      const menuItem = state$.value.menuItem.all[menuItemId];
      if (!ingredient || !menuItem) {
        return of({
          type: types.UNASSIGN_INGREDIENT_FAIL,
          payload: 'ingredient and menuItem required'
        });
      }
      
      const newIngredients = menuItem.ingredients;
      const index = findIndex(propEq('id', ingredientId))(newIngredients);
      newIngredients[index] = pipe(
        assocPath(['pivot', 'excludable'], excludable),
        assoc('excludable', excludable)
      )(newIngredients[index]);

      const updatePayload = {
        id: menuItemId,
        ingredients: newIngredients
      }
      return of({
        type: types.UPDATE_MENUITEM_INIT,
        payload: updatePayload,
      });
    })    
  )

export const assignAddonEpic = (action$) => 
  action$.pipe(
    ofType(getType(assignAddonAsync.request)),
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
          type: getType(assignAddonAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(assignAddonAsync.failure),
          initAction: action
        }))
      );
    })
  );

export const unassignAddonEpic = (action$) => 
  action$.pipe(
    ofType(getType(unassignAddonAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, addonId } = payload;

      return fromPromise(API.UnassignAddon(menuItemId, { addonId })).pipe(
        map((res) => ({
          type: getType(unassignAddonAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(unassignAddonAsync.failure),
          initAction: action
        }))
      );
    })
  );


export const assignOptionEpic = (action$) => 
  action$.pipe(
    ofType(getType(assignOptionAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, optionId } = payload;

      const body = {
        optionId,
        published: true
      }

      return fromPromise(API.AssignOption(menuItemId, body)).pipe(
        map((res) => ({
          type: getType(assignOptionAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(assignOptionAsync.failure),
          initAction: action
        }))
      );
    })
  );

export const unassignOptionEpic = (action$) => 
  action$.pipe(
    ofType(getType(unassignOptionAsync.request)),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, optionId } = payload;

      return fromPromise(API.UnassignOption(menuItemId, { optionId })).pipe(
        map((res) => ({
          type: getType(unassignOptionAsync.success),
          payload: res,
          meta: payload
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: getType(unassignOptionAsync.failure),
          initAction: action
        }))
      );
    })
  );  

export default [
  fetchMenuItemEpic,
  createMenuItemEpic,
  updateMenuItemEpic,
  assignIngredientEpic,
  unassignIngredientEpic,
  setIngredientExcludabilityEpic,
  assignAddonEpic,
  unassignAddonEpic,
  assignOptionEpic,
  unassignOptionEpic
];
