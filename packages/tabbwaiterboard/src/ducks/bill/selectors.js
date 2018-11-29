import { createSelector } from 'reselect'
import { MapToList } from 'tabb-front/dist/lib/FN';
import groupBy from 'ramda/src/groupBy'

export const getGroupedBills = createSelector(
  [
    (state) => state.bill.all,
  ],
  (all) => {
    return groupBy((b) => b.status === 'PROCESSED' ? 'PROCESSED' : 'INITIATED')(MapToList(all));
  }
)
