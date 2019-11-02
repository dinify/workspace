import { MenuItemRequest, MenuItemResponseNormalized } from 'MenuItemsModels';
import { createAsyncAction, createAction } from 'typesafe-actions';

const p = 'dinify/cart';

export const fetchMenuItemAsync = createAsyncAction(
  `${p}/GET_MENUITEM_INIT`, // { menuItemId }
  `${p}/GET_MENUITEM_DONE`,
  `${p}/GET_MENUITEM_FAIL`,
)<MenuItemRequest, MenuItemResponseNormalized, string>();

export const clearCustomizationsAction = createAction(
  `${p}/CLEAR_CUSTOMIZATIONS`,
  action => {
    return ({ menuItemId }: { menuItemId: string }) => action({ menuItemId });
  },
);

export const fetchMenuitemsInit = (payload: any) => ({
  type: 'FETCH_MENUITEMS_INIT',
  payload,
});

export const fetchMenuitemInit = (payload: any) => ({
  type: 'FETCH_MENUITEM_INIT',
  payload,
});

export const favMenuitemInit = (payload: any) => ({
  type: 'FAV_MENUITEM_INIT',
  payload,
});

export const favMenuitemDone = (payload: any) => ({
  type: 'FAV_MENUITEM_DONE',
  payload,
});

export const excludeIngredient = (payload: any) => ({
  type: 'EXCLUDE_INGREDIENT',
  payload,
});

export const incAddonQty = (payload: {
  menuItemId: string;
  addonId: string;
  inc: number;
}) => ({
  type: 'INC_ADDON_QTY',
  payload,
});

export const selectChoice = (payload: any) => ({
  type: 'SELECT_CHOICE',
  payload,
});
