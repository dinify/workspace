import { createSelector } from 'reselect'
import { MapToList } from '@dinify/common/src/lib/FN';

export const getSeatList = createSelector(
  [
    (state: any) => state.seat.all,
  ],
  (all) => {
    return MapToList(all);
  }
)
