import types from './types';

export const fetchMenucategoriesInit = ({ subdomain }) => ({
  type: types.FETCH_MENUCATEGORIES_INIT,
  payload: { subdomain }
});
