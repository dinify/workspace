import { createSelector } from 'reselect';
import { MapToList } from '../../lib/FN';
import { TransactionState } from './reducers';
import { OrderStatus, OrderN, OrderNMap } from 'TransactionModels';
import pipe from 'ramda/es/pipe';
import pluck from 'ramda/es/pluck';
import unnest from 'ramda/es/unnest';
import filter from 'ramda/es/filter';

export const getOrders = createSelector(
  [
    (state: TransactionState) => state.orders
  ],
  (orders: OrderNMap): OrderN[] => {
    return MapToList(orders);
  }
);

export const getOrderIds = createSelector(
  [
    getOrders
  ],
  (orders: OrderN[]): string[] => {
    return orders.map(o => o.id);
  }
);

export const getOrderItemIdsByStatus = createSelector(
  [
    (state: TransactionState) => state.orders
  ],
  (orders: OrderNMap) => (status: OrderStatus): string[] => {
    return pipe(
      MapToList,
      filter((order: OrderN) => order.status === status),
      (list) => pluck('items', list),
      unnest
    )(orders);
  }
);

export const getOrderItemIds = createSelector(
  [
    (state: TransactionState) => state.orders
  ],
  (orders: OrderNMap): string[] => {
    return pipe(
      MapToList,
      (list) => pluck('items', list),
      unnest
    )(orders);
  }
);

export const getOrderItemCount = createSelector(
  [
    getOrderItemIds
  ],
  (orderItemIds): number => orderItemIds.length
);