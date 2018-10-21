import { createSelector } from 'reselect';
import R from 'ramda';

const mapIndexed = R.addIndex( R.map );
const reduceIndexed = R.addIndex( R.reduce );
const convertGrid = reduceIndexed(
  ( acc, array, i ) => [...acc, ...mapIndexed( ( value, j ) => ( { row: i, column: j, value } ), array ) ],
  [ ]
);
// import * as FN from 'tabb-front/dist/lib/FN';

export const selectedBillItems = createSelector(
  [
    (state) => R.pluck('value')(convertGrid(R.pluck('items')(R.filter(o => o !== null, R.pluck('bill')(state.seat.seats))))),
  ],
  (billItems) => {
    return R.filter(o => o.selected, billItems);
  },
)

export const checkSelecting = createSelector(
  [
    (state) => R.pluck('value')(convertGrid(R.pluck('items')(R.filter(o => o !== null, R.pluck('bill')(state.seat.seats))))),
  ],
  (billItems) => {
    if (!billItems) return false;
    return R.any((item) => item.selected)(billItems);
  }
)
