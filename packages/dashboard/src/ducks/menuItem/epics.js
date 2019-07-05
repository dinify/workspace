import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import findIndex from 'ramda/src/findIndex';
import propEq from 'ramda/src/propEq';
import pipe from 'ramda/src/pipe';
import filter from 'ramda/src/filter';
import assoc from 'ramda/src/assoc';
import dissoc from 'ramda/src/dissoc';

import assocPath from 'ramda/src/assocPath';
import { ListToMap } from '@dinify/common/dist/lib/FN';
import * as types from './types';

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
        }].map((o) => dissoc('choices')(o))
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
  assignIngredientEpic,
  unassignIngredientEpic,
  setIngredientExcludabilityEpic,
  assignAddonEpic,
  unassignAddonEpic,
  assignOptionEpic,
  unassignOptionEpic
];
