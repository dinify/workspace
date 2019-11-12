import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import { selectedRestaurantId } from '../restaurant/selectors';
import pipe from 'ramda/es/pipe';
import filter from 'ramda/es/filter';

export const allCalls = state => state.call.all;

export const getCallList = createSelector(
  [
    allCalls,
    selectedRestaurantId
  ],
  (all, rId) => {
    return pipe(
      (m) => MapToList(m),
      filter((c) => c.status === 'PENDING' && c.seat.table.waiterboard.restaurantId === rId)
    )(all);
  }
);
