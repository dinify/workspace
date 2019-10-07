import { from as fromPromise, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import findIndex from 'ramda/es/findIndex';
import propEq from 'ramda/es/propEq';
import pipe from 'ramda/es/pipe';
import filter from 'ramda/es/filter';
import assoc from 'ramda/es/assoc';

import assocPath from 'ramda/es/assocPath';
import { ListToMap, handleEpicAPIError } from '@dinify/common/dist/lib/FN';
import * as API from '@dinify/common/src/api/v2/restaurant.ts';
import * as types from './types';

const fetchMenuItemEpic = (action$) =>
  action$.pipe(
    ofType('GET_MENUITEM_INIT'),
    mergeMap((action) => {
      const { id } = action.payload;

      return fromPromise(API.GetMenuItem({ menuItemId: id })).pipe(
        map((res) => ({
          type: 'GET_MENUITEM_DONE',
          payload: res
        })),
        catchError(error => handleEpicAPIError({
          error,
          failActionType: 'GET_MENUITEM_FAIL',
          initAction: action
        }))
      );
    })
  );

export const assignIngredientEpic = (action$, state$) => 
  action$.pipe(
    ofType(types.ASSIGN_INGREDIENT_INIT),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, ingredientId } = payload;
      const ingredient = state$.value.ingredient.all[ingredientId];
      const menuItem = state$.value.menuItem.all[menuItemId];
      if (!ingredient || !menuItem) {
        return of({
          type: types.ASSIGN_INGREDIENT_FAIL,
          payload: 'ingredient and menuItem required'
        });
      }
      if (ListToMap(menuItem.ingredients)[ingredientId]) {
        return of({
          type: types.ASSIGN_INGREDIENT_FAIL,
          payload: 'ingredient already assigned'
        });        
      }
      const updatePayload = {
        id: menuItemId,
        ingredients: [...menuItem.ingredients, ingredient]
      }
      return of({
        type: types.UPDATE_MENUITEM_INIT,
        payload: updatePayload,
      });
    })
  )

export const unassignIngredientEpic = (action$, state$) => 
  action$.pipe(
    ofType(types.UNASSIGN_INGREDIENT_INIT),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, ingredientId } = payload;
      const ingredient = state$.value.ingredient.all[ingredientId];
      const menuItem = state$.value.menuItem.all[menuItemId];
      if (!ingredient || !menuItem) {
        return of({
          type: types.UNASSIGN_INGREDIENT_FAIL,
          payload: 'ingredient and menuItem required'
        });
      }
      const newIngredients = filter((i) => i.id !== ingredientId, menuItem.ingredients);
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

export const assignAddonEpic = (action$, state$) => 
  action$.pipe(
    ofType(types.ASSIGN_ADDON_INIT),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, addonId } = payload;
      const addon = state$.value.addon.all[addonId];
      const menuItem = state$.value.menuItem.all[menuItemId];
      if (!addon || !menuItem) {
        return of({
          type: types.ASSIGN_ADDON_FAIL,
          payload: 'addon and menuItem required'
        });
      }
      if (ListToMap(menuItem.addons)[addonId]) {
        return of({
          type: types.ASSIGN_ADDON_FAIL,
          payload: 'addon already assigned'
        });        
      }
      const updatePayload = {
        id: menuItemId,
        addons: [...menuItem.addons, addon]
      }
      return of({
        type: types.UPDATE_MENUITEM_INIT,
        payload: updatePayload,
      });
    })
  )

export const unassignAddonEpic = (action$, state$) => 
  action$.pipe(
    ofType(types.UNASSIGN_ADDON_INIT),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, addonId } = payload;
      const addon = state$.value.addon.all[addonId];
      const menuItem = state$.value.menuItem.all[menuItemId];
      if (!addon || !menuItem) {
        return of({
          type: types.UNASSIGN_ADDON_FAIL,
          payload: 'addon and menuItem required'
        });
      }
      const newAddons = filter((i) => i.id !== addonId, menuItem.addons);
      const updatePayload = {
        id: menuItemId,
        addons: newAddons
      }
      return of({
        type: types.UPDATE_MENUITEM_INIT,
        payload: updatePayload,
      });
    })
  )

export const assignOptionEpic = (action$, state$) => 
  action$.pipe(
    ofType(types.ASSIGN_OPTION_INIT),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, optionId } = payload;
      const option = state$.value.option.all[optionId];
      const menuItem = state$.value.menuItem.all[menuItemId];
      if (!option || !menuItem) {
        return of({
          type: types.ASSIGN_OPTION_FAIL,
          payload: 'option and menuItem required'
        });
      }
      if (ListToMap(menuItem.options)[optionId]) {
        return of({
          type: types.ASSIGN_OPTION_FAIL,
          payload: 'option already assigned'
        });        
      }
      const updatePayload = {
        id: menuItemId,
        options: [...menuItem.options, {
          ...option,
          difference: { amount: '0', currency: 'CZK' }
        }]// .map((o) => dissoc('choices')(o))
      }
      return of({
        type: types.UPDATE_MENUITEM_INIT,
        payload: updatePayload,
      });
    })
  )

export const unassignOptionEpic = (action$, state$) => 
  action$.pipe(
    ofType(types.UNASSIGN_OPTION_INIT),
    mergeMap((action) => {
      const { payload } = action;
      const { menuItemId, optionId } = payload;
      const option = state$.value.option.all[optionId];
      const menuItem = state$.value.menuItem.all[menuItemId];
      if (!option || !menuItem) {
        return of({
          type: types.UNASSIGN_OPTION_FAIL,
          payload: 'option and menuItem required'
        });
      }
      const newOptions = filter((i) => i.id !== optionId, menuItem.options);
      const updatePayload = {
        id: menuItemId,
        options: newOptions
      }
      return of({
        type: types.UPDATE_MENUITEM_INIT,
        payload: updatePayload,
      });
    })
  )

export default [
  fetchMenuItemEpic,
  assignIngredientEpic,
  unassignIngredientEpic,
  setIngredientExcludabilityEpic,
  assignAddonEpic,
  unassignAddonEpic,
  assignOptionEpic,
  unassignOptionEpic
];
