import {
  createAsyncAction
} from 'typesafe-actions';

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

export const removeMenuItemAsync = createAsyncAction(
  `${p}/DELETE_ITEM_INIT`,
  `${p}/DELETE_ITEM_DONE`,
  `${p}/DELETE_ITEM_FAIL`
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

export const setIngredientExcludabilityAsync = createAsyncAction(
  `${p}/SET_INGREDIENT_EXCLUDABILITY_INIT`,
  `${p}/SET_INGREDIENT_EXCLUDABILITY_DONE`,
  `${p}/SET_INGREDIENT_EXCLUDABILITY_FAIL`
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

export const reorderItemsAsync = createAsyncAction(
  `${p}/REORDER_MENUITEM_INIT`,
  `${p}/REORDER_MENUITEM_DONE`,
  `${p}/REORDER_MENUITEM_FAIL`
)();

export const uploadItemImageAsync = createAsyncAction(
  `${p}/UPLOAD_ITEMIMAGE_INIT`,
  `${p}/UPLOAD_ITEMIMAGE_DONE`,
  `${p}/UPLOAD_ITEMIMAGE_FAIL`
)();
