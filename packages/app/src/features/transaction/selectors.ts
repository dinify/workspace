import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import { TransactionState } from './reducers';
import { OrderStatus, OrderN, OrderNMap } from 'TransactionModels';
import pipe from 'ramda/es/pipe';
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
      filter((order: OrderN) => order.status === status) as any,
      (list: any[]) => list.map((l: any) => l.items),
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
      MapToList as (orders: OrderNMap) => any,
      (list: any[]) => list.map((l: any) => l.items),
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
