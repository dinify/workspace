import { createSelector } from 'reselect';

export const cart = createSelector(
  [
    (state) => state.cart.cart.res,
  ],
  (cart) => {
    return cart;
  }
);

export const cartItemCount = createSelector(
  [
    cart
  ],
  (cart) => {
    if (!cart || cart.data === null) return 0;
    return cart.count;
  }
);

export const cartExists = createSelector(
  [
    cart
  ],
  (cart) => {
    return cart !== undefined && cart !== null;
  }
);
