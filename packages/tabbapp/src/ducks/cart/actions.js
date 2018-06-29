import types from './types';

export const fetchCartInit = () => ({
  type: types.FETCH_CART_INIT,
})

export const addItem = (payload) => ({
  type: types.ADD_ITEM,
  payload
});
