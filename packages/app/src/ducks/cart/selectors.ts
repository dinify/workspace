import { createSelector } from 'reselect';
import { CartState } from './reducers';
import { MapToList } from '@dinify/common/src/lib/FN';


export const getOrderItems = (state: CartState) => state.items;


export const getOrderItemsList = createSelector(
  [
    getOrderItems
  ],
  (cartItemsMap) => {
    return MapToList(cartItemsMap);
  }
);
