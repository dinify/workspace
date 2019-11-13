import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import groupBy from 'ramda/es/groupBy';
import pipe from 'ramda/es/pipe';
import filter from 'ramda/es/filter';
import { selectedRestaurantId } from '../restaurant/selectors';

export const allBills = (state: any) => state.bill.all;

export const getGroupedBills = createSelector(
  [
    allBills,
    selectedRestaurantId
  ],
  (all: any, rId: string) => {
    return pipe(
      (all: any) => MapToList(all, { sortBy: 'updatedAt', sortType: String }),
      (list: any[]) => filter((o: any) => o.restaurantId === rId)(list),
      groupBy((b: any) => b.status === 'PROCESSED' ? 'PROCESSED' : 'INITIATED')
    )(all);
  }
);
