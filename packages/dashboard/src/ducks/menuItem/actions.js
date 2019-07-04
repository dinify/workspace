import * as types from './types';

export const updateCusomizationsInit = (payload) => ({
  type: types.UPDATECUSOMIZATIONS_INIT,
  payload
});

export const fetchMenuitemInit = payload => ({
  type: types.FETCH_MENUITEM_INIT,
  payload,
});

export const updateMenuitemInit = payload => ({
  type: types.UPDATE_MENUITEM_INIT,
  payload,
});

export const createMenuitemInit = payload => ({
  type: types.CREATE_MENUITEM_INIT,
  payload,
});

export const removeMenuitemInit = payload => ({
  type: types.REMOVE_MENUITEM_INIT,
  payload,
});

export const reorderItemsInit = payload => ({
  type: types.REORDER_MENUITEM_INIT,
  payload,
});

export const assignIngredient = payload => ({
  type: types.ASSIGN_INGREDIENT_INIT,
  payload,
});

export const unassignIngredient = payload => ({
  type: types.UNASSIGN_INGREDIENT_INIT,
  payload,
});

export const setIngredientExcludability = payload => ({
  type: types.SET_INGREDIENT_EXCLUDABILITY_INIT,
  payload,
});
