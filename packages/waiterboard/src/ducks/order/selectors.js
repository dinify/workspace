import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/dist/lib/FN';
import filter from 'ramda/src/filter';

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

