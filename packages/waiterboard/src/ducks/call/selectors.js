import { createSelector } from 'reselect';
import { MapToList } from '@dinify/common/dist/lib/FN';
import filter from 'ramda/es/filter';

export const getCallList = createSelector(
  [
    (state) => state.call.all,
  ],
  (all) => {
    return filter((c) => c.status === 'PENDING')(MapToList(all));
  }
);
