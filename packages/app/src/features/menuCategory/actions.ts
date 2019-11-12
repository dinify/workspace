import {
  MenuCategoriesRequest,
  MenuCategoriesResponseNormalized
} from 'MenuCategoriesModels';
import {
  createAsyncAction
} from 'typesafe-actions';

const p = 'dinify/cart';

export const fetchMenuCategoriesAsync = createAsyncAction(
  `${p}/GET_MENUCATEGORIES_INIT`, // { subdomain }
  `${p}/GET_MENUCATEGORIES_DONE`,
  `${p}/GET_MENUCATEGORIES_FAIL`
)<MenuCategoriesRequest, MenuCategoriesResponseNormalized, string>();

