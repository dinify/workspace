import { createSelector } from 'reselect';
import filter from 'ramda/src/filter';
import propEq from 'ramda/src/propEq';
import any from 'ramda/src/any';

export const checkSelecting = createSelector(
  [
    (state) => {
      //console.log(mergeAll(pluck('bill.items')(state.seat.seats)));
      filter(propEq('selected', 'sds'));
    },
  ],
  (billItems) => {
    if (!billItems) return false;
    return any((item) => item.selected)(billItems);
  }
);
