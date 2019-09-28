import * as types from './types';

export const fetchMenuCategoriesInit = (payload) => ({
	type: types.FETCH_MENUCATEGORIES_INIT,
	payload
});

export const fetchMenuCategoriesDone = (payload) => ({
	type: types.FETCH_MENUCATEGORIES_DONE,
	payload
});

export const createMenucategoryInit = payload => ({
  type: 'POST_MENUCATEGORY_INIT',
  payload,
});