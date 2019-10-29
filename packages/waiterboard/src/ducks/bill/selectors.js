import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/src/lib/FN';
import groupBy from 'ramda/es/groupBy';

export const getGroupedBills = createSelector(
  [
    (state) => state.bill.all,
  ],
  (all) => {
    return groupBy((b) => b.status === 'PROCESSED' ? 'PROCESSED' : 'INITIATED')(
      MapToList(all, { sortBy: 'updatedAt', sortType: String })
    );
  }
);
