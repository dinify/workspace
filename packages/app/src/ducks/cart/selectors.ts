import { createSelector } from 'reselect';
import { CartState } from './reducers';
import { MapToList } from '../../lib/FN';


export const getOrderItems = (state: CartState) => state.items;

export const getOrderItemsList = createSelector(
  [
    getOrderItems
  ],
  (orderItemsMap) => {
    return MapToList(orderItemsMap);
  }
);

export const getOrderItemCount = createSelector(
  [
    getOrderItemsList
  ],
  (orderItemsList) => {
    return orderItemsList.length;
  }
);
