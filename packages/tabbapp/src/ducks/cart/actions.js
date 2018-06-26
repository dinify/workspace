import types from './types';

export const addDish = ({ dishId }) => ({
  type: types.ADD_DISH,
  payload: { dishId }
});
