import { createSelector } from 'reselect';
import { CartState } from './reducers';


export const getCart = (state: CartState) => state.cart;


export const cartExists = createSelector(
  [
    getCart
  ],
  (cart) => {
    return cart !== undefined && cart !== null;
  }
);
