import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import keys from 'ramda/src/keys';
import findIndex from 'ramda/src/findIndex';
import propEq from 'ramda/src/propEq';
import pipe from 'ramda/src/pipe';
import filter from 'ramda/src/filter';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import { MapToList, ListToMap } from '@dinify/common/dist/lib/FN';
import * as types from './types';

const updateCusomizationsEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.UPDATECUSOMIZATIONS_INIT),
    mergeMap(({ payload: { menuItemId, actionKind, custKey, custId, cust, updateObj } }) => {

      const menuItem = state$.value.menuItem.all[menuItemId];
      if (!menuItem) return { type: types.UPDATECUSOMIZATIONS_FAIL };

      const custs = menuItem[custKey]; // ingredietns, addons or options

      const updKeys = keys(updateObj);

      let updatedCusts;
      let updatedCustsForStore;
      if (actionKind === 'ADD') {
        updatedCusts = assocPath([custId], cust)(custs);
        updatedCustsForStore = updatedCusts;
      }
      if (actionKind === 'UPDATE') {
        updatedCusts = assocPath([custId, updKeys[0]], updateObj[updKeys[0]])(custs);
        updatedCustsForStore = assocPath([custId, 'pivot', updKeys[0]], updateObj[updKeys[0]])(custs);
      }
      if (actionKind === 'REMOVE') {
        updatedCusts = dissocPath([custId])(custs);
        updatedCustsForStore = updatedCusts;
      }
      const updatePayload = {};
      updatePayload.id = menuItemId;
      updatePayload[custKey] = MapToList(updatedCusts);

      return of(
        {
          type: types.UPDATECUSOMIZATIONS_UPDATING,
          payload: {
            id: menuItemId,
            custKey,
            updatedCusts: updatedCustsForStore,
          },
        },
        {
          type: types.UPDATE_MENUITEM_INIT,
          payload: updatePayload,
        }
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

export default [
  assignIngredientEpic,
  unassignIngredientEpic,
  updateCusomizationsEpic,
  setIngredientExcludabilityEpic
];
