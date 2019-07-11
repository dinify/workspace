import { createSelector } from 'reselect'
import { MapToList } from '@dinify/common/dist/lib/FN';

export const getTableList = createSelector(
  [
    (state) => state.table.all,
  ],
  (all) => {
    return MapToList(all, { sortType: Number, sortBy: 'number' });
  }
)
