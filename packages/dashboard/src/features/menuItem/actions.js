import {
  createAsyncAction
} from 'typesafe-actions';
import * as types from './types';

const p = 'dinify/menuItem';

export const fetchMenuItemAsync = createAsyncAction(
  `${p}/GET_ITEM_INIT`,
  `${p}/GET_ITEM_DONE`,
  `${p}/GET_ITEM_FAIL`
)();

export const createMenuItemAsync = createAsyncAction(
  `${p}/POST_ITEM_INIT`,
  `${p}/POST_ITEM_DONE`,
  `${p}/POST_ITEM_FAIL`
)();


export const updateMenuItemAsync = createAsyncAction(
  `${p}/PATCH_ITEM_INIT`,
  `${p}/PATCH_ITEM_DONE`,
  `${p}/PATCH_ITEM_FAIL`
)();

export const assignIngredientAsync = createAsyncAction(
  `${p}/ASSIGN_INGREDIENT_INIT`,
  `${p}/ASSIGN_INGREDIENT_DONE`,
  `${p}/ASSIGN_INGREDIENT_FAIL`
)();

export const unassignIngredientAsync = createAsyncAction(
  `${p}/UNASSIGN_INGREDIENT_INIT`,
  `${p}/UNASSIGN_INGREDIENT_DONE`,
  `${p}/UNASSIGN_INGREDIENT_FAIL`
)();

export const assignAddonAsync = createAsyncAction(
  `${p}/ASSIGN_ADDON_INIT`,
  `${p}/ASSIGN_ADDON_DONE`,
  `${p}/ASSIGN_ADDON_FAIL`
)();

export const unassignAddonAsync = createAsyncAction(
  `${p}/UNASSIGN_ADDON_INIT`,
  `${p}/UNASSIGN_ADDON_DONE`,
  `${p}/UNASSIGN_ADDON_FAIL`
)();

export const assignOptionAsync = createAsyncAction(
  `${p}/ASSIGN_OPTION_INIT`,
  `${p}/ASSIGN_OPTION_DONE`,
  `${p}/ASSIGN_OPTION_FAIL`
)();

export const unassignOptionAsync = createAsyncAction(
  `${p}/UNASSIGN_OPTION_INIT`,
  `${p}/UNASSIGN_OPTION_DONE`,
  `${p}/UNASSIGN_OPTION_FAIL`
)();

export const updateMenuitemInit = payload => ({
  type: types.UPDATE_MENUITEM_INIT,
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

export const assignAddon = payload => ({
  type: types.ASSIGN_ADDON_INIT,
  payload,
});

export const unassignAddon = payload => ({
  type: types.UNASSIGN_ADDON_INIT,
  payload,
});

export const assignOption = payload => ({
  type: types.ASSIGN_OPTION_INIT,
  payload,
});

export const unassignOption = payload => ({
  type: types.UNASSIGN_OPTION_INIT,
  payload,
});

export const uploadItemImageInit = payload => ({
  type: types.UPDATE_ITEMIMAGE_INIT,
  payload,
});