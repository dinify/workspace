import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import filter from 'ramda/es/filter';

export const getBookingList = createSelector(
  [
    (state: any) => state.booking.all,
  ],
  (all: any) => {
    return filter((b: any) => b.status === 'PENDING')(MapToList(all));
  }
);
