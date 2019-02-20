import { createSelector } from 'reselect'
import { MapToList } from '@dinify/common/dist/lib/FN';
import filter from 'ramda/src/filter'

export const getBookingList = createSelector(
  [
    (state) => state.booking.all,
  ],
  (all) => {
    return filter((b) => b.status === 'PENDING')(MapToList(all));
  }
)