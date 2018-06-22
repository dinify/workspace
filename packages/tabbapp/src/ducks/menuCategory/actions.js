import types from './types';

export const fetchMenucategoriesInit = ({ restaurantId }) => ({
  type: types.FETCH_MENUCATEGORIES_INIT,
  payload: { restaurantId }
});
