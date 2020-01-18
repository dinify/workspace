import {
  createAsyncAction
} from 'typesafe-actions';

const p = 'dinify/menuCategory';

export const fetchMenuCategoriesAsync = createAsyncAction(
  `${p}/GET_CATEGORIES_INIT`,
  `${p}/GET_CATEGORIES_DONE`,
  `${p}/GET_CATEGORIES_FAIL`
)<undefined, any, string>();

export const createMenuCategoryAsync = createAsyncAction(
  `${p}/POST_CATEGORIES_INIT`,
  `${p}/POST_CATEGORIES_DONE`,
  `${p}/POST_CATEGORIES_FAIL`
)<undefined, any, string>();

export const updateMenuCategoryAsync = createAsyncAction(
  `${p}/UPD_CATEGORIES_INIT`,
  `${p}/UPD_CATEGORIES_DONE`,
  `${p}/UPD_CATEGORIES_FAIL`
)<undefined, any, string>();

export const removeMenuCategoryAsync = createAsyncAction(
  `${p}/DEL_CATEGORIES_INIT`,
  `${p}/DEL_CATEGORIES_DONE`,
  `${p}/DEL_CATEGORIES_FAIL`
)<undefined, any, string>();
