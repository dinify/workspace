import { createSelector } from 'reselect'
import R from 'ramda'
// import * as FN from 'lib/FN';

export const checkSelecting = createSelector(
  [
    (state) => state.bill.bill.items,
  ],
  (billItems) => {
    if (!billItems) return false;
    return R.any((item) => item.selected)(billItems);
  }
)
