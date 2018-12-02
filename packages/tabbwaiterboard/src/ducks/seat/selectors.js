import { createSelector } from 'reselect'
import { MapToList } from 'tabb-front/dist/lib/FN';

export const getSeatList = createSelector(
  [
    (state) => state.seat.all,
  ],
  (all) => {
    return MapToList(all);
  }
)
