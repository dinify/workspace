import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import { selectedRestaurantId } from '../restaurant/selectors';
import pipe from 'ramda/es/pipe';
import filter from 'ramda/es/filter';

export const allCalls = (state: any) => state.call.all;

export const getCallList = createSelector(
  [
    allCalls,
    selectedRestaurantId
  ],
  (all: any, rId) => {
    return pipe(
      (m: any) => MapToList(m),
      filter((c: any) => c.status === 'PENDING' && c.seat.table.waiterboard.restaurantId === rId)
    )(all);
  }
);
