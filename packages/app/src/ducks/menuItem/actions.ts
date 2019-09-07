import {
  MenuItemRequest,
  MenuItemResponse
} from 'MenuItemsModels';
import {
  createAsyncAction
} from 'typesafe-actions';

const p = 'dinify/cart';

export const fetchMenuItemAsync = createAsyncAction(
  `${p}/GET_MENUITEM_INIT`, // { menuItemId }
  `${p}/GET_MENUITEM_DONE`,
  `${p}/GET_MENUITEM_FAIL`
)<MenuItemRequest, MenuItemResponse, string>();

export const fetchMenuitemsInit = ({ categoryId }) => ({
  type: 'FETCH_MENUITEMS_INIT',
  payload: { categoryId }
});

export const fetchMenuitemInit = ({ id }) => ({
  type: 'FETCH_MENUITEM_INIT',
  payload: { id }
});

export const favMenuitemInit = ({ fav, id }) => ({
  type: 'FAV_MENUITEM_INIT',
  payload: { fav, id }
});

export const favMenuitemDone = ({ res, initPayload }) => ({
  type: 'FAV_MENUITEM_DONE',
  payload: {res, initPayload }
});

export const excludeIngredient = ({ menuItemId, ingredientId, excluded }) => ({
  type: 'EXCLUDE_INGREDIENT',
  payload: { menuItemId, ingredientId, excluded }
})

export const incAddonQty = ({ menuItemId, addonId, inc }) => ({
  type: 'INC_ADDON_QTY',
  payload: { menuItemId, addonId, inc }
})

export const selectChoice = ({ menuItemId, optionId, choiceId }) => ({
  type: 'SELECT_CHOICE',
  payload: { menuItemId, optionId, choiceId }
})
