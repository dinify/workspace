import { createSelector } from 'reselect';
import { MapToList } from '../../lib/FN';
import { TransactionState } from './reducers';
import { OrderNMap } from 'TransactionModels';
import pipe from 'ramda/es/pipe';
import pluck from 'ramda/es/pluck';
import unnest from 'ramda/es/unnest';

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
