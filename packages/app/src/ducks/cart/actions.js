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

export const rmFromCartInit = ({ orderItemId }) => ({
  type: types.REMOVE_ORDERITEM_INIT,
  payload: { orderItemId }
});

export const orderInit = (items) => ({
  type: types.ORDER_INIT,
  payload: items
});

export const orderDone = (res) => ({
  type: types.ORDER_DONE,
  payload: res
});

export const setOrderTypeAction = ({ orderType }) => ({
  type: types.SET_ORDERTYPE,
  payload: { orderType }
})
