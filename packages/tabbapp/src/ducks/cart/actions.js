import types from './types';

export const fetchCartInit = () => ({
  type: types.FETCH_CART_INIT,
})

export const fetchCartFail = (e) => ({
  type: types.FETCH_CART_FAIL,
  payload: e
})

export const addToCartInit = ({ menuItemId }) => ({
  type: types.ADD_TO_CART_INIT,
  payload: { menuItemId }
});

export const addToCartDone = (res) => ({
  type: types.ADD_TO_CART_DONE,
  payload: res
});

export const addToCartFail = (e) => ({
  type: types.ADD_TO_CART_FAIL,
  payload: e
});

export const rmFromCartInit = ({ orderItemId }) => ({
  type: types.REMOVE_ORDERITEM_INIT,
  payload: { orderItemId }
});
