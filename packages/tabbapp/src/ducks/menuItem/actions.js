import types from './types';

export const fetchMenuitemsInit = ({ categoryId }) => ({
  type: types.FETCH_MENUITEMS_INIT,
  payload: { categoryId }
});

export const fetchMenuitemInit = ({ id }) => ({
  type: types.FETCH_MENUITEM_INIT,
  payload: { id }
});
