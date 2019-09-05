import { createSelector } from 'reselect';
import { CartState } from './reducers';
import { MapToList } from '@dinify/common/src/lib/FN';


export const getCartItems = (state: CartState) => state.items;


export const getCartItemsList = createSelector(
  [
    getCartItems
  ],
  (cartItemsMap) => {
    return MapToList(cartItemsMap);
  }
);
