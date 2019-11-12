import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import filter from 'ramda/es/filter';

export const getBookingList = createSelector(
  [
    (state) => state.booking.all,
  ],
  (all) => {
    return filter((b) => b.status === 'PENDING')(MapToList(all));
  }
);
