import types from './types';

export const fetchMenuitemsInit = ({ categoryId }) => ({
  type: types.FETCH_MENUITEMS_INIT,
  payload: { categoryId }
});
