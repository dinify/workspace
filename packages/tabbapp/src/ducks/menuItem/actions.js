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

export const favMenuitemDone = (res) => ({
  type: types.FAV_MENUITEM_DONE,
  payload: res
});

export const favMenuitemFail = (e) => ({
  type: types.FAV_MENUITEM_FAIL,
  payload: e
});
