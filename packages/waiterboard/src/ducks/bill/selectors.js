import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import groupBy from 'ramda/es/groupBy';
import pipe from 'ramda/es/pipe';
import filter from 'ramda/es/filter';
import { selectedRestaurantId } from '../restaurant/selectors';

export const allBills = state => state.bill.all;

export const getGroupedBills = createSelector(
  [
    allBills,
    selectedRestaurantId
  ],
  (all, rId) => {
    return pipe(
      (all) => MapToList(all, { sortBy: 'updatedAt', sortType: String }),
      filter((o) => o.restaurantId === rId),
      groupBy((b) => b.status === 'PROCESSED' ? 'PROCESSED' : 'INITIATED')
    )(all);
  }
);
