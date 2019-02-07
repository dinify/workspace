import types from './types';

export const fetchMenuitemsInit = ({ categoryId }) => ({
  type: types.FETCH_MENUITEMS_INIT,
  payload: { categoryId }
});

export const fetchMenuitemInit = ({ id }) => ({
  type: types.FETCH_MENUITEM_INIT,
  payload: { id }
});

export const favMenuitemInit = ({ fav, id }) => ({
  type: types.FAV_MENUITEM_INIT,
  payload: { fav, id }
});

export const favMenuitemDone = ({ res, prePayload }) => ({
  type: types.FAV_MENUITEM_DONE,
  payload: {res, prePayload }
});

export const favMenuitemFail = ({ error, prePayload }) => ({
  type: types.FAV_MENUITEM_FAIL,
  payload: { error, prePayload }
});

export const excludeIngredient = ({ menuItemId, ingredientId, excluded }) => ({
  type: types.EXCLUDE_INGREDIENT,
  payload: { menuItemId, ingredientId, excluded }
})

export const incAddonQty = ({ menuItemId, addonId, inc }) => ({
  type: types.INC_ADDON_QTY,
  payload: { menuItemId, addonId, inc }
})

export const selectChoice = ({ menuItemId, optionId, choiceId }) => ({
  type: types.SELECT_CHOICE,
  payload: { menuItemId, optionId, choiceId }
})
