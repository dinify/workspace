import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import filter from 'ramda/es/filter';

export const getOrderList = createSelector(
  [
    (state) => state.order.all,
  ],
  (all) => {
    return filter((o) => o.status !== 'CONFIRMED')(MapToList(all));
  }
);

export const getConfirmedOrderList = createSelector(
  [
    (state) => state.order.all,
  ],
  (all) => {
    return filter((o) => o.status === 'CONFIRMED')(MapToList(all));
  }
);

