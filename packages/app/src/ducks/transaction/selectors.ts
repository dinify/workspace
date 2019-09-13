import { createSelector } from 'reselect';
import { MapToList } from '../../lib/FN';
import { TransactionState } from './reducers';
import { OrderN, OrderNMap } from 'TransactionModels';

export const getOrderItemIds = createSelector(
  [
    (state: TransactionState) => state.orders
  ],
  (orders: OrderNMap): string[] => {
    // TODO: convert to ramda goodness
    // mapObjIndexed((order: OrderN) => pluck('items', order), orders);

    let arr: string[] = [];
    MapToList(orders).forEach((order: OrderN) => {
      arr.push(...order.items)
    });
    return arr;
  }
);

export const getOrderItemCount = createSelector(
  [
    (state: TransactionState) => state.orders
  ],
  (orders: OrderNMap): number => {
    // TODO: convert to ramda goodness
    let count = 0;
    MapToList(orders).forEach((order: OrderN) => {
      count += order.items.length;
    });
    return count;
  }
);
