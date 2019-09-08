import { createSelector } from 'reselect';
import { CartState } from './reducers';
import { MapToList } from '../../lib/FN';
import { OrderItemNMap } from 'CartModels';


export const getOrderItems = (state: CartState): OrderItemNMap => state.items;

export const getOrderItemsList = createSelector(
  [
    getOrderItems
  ],
  (orderItemsMap: OrderItemNMap) => {
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
