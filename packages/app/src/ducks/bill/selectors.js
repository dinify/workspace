import { createSelector } from 'reselect'
import * as R from 'ramda'
// import * as FN from '@dinify/common/dist/lib/FN';

export const checkSelecting = createSelector(
  [
    (state) => {
      console.log(R.pluck('bill')(state.seat.seats));
      //console.log(R.mergeAll(R.pluck('bill.items')(state.seat.seats)));
      R.filter(R.propEq('selected', 'sds'));
    },
  ],
  (billItems) => {
    if (!billItems) return false;
    return R.any((item) => item.selected)(billItems);
  }
)
