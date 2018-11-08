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
    (state) => {
      const result = [];
      R.map(seat => {
        if (seat.bill) {
          Object.values(seat.bill.orders).forEach(order => {
            result.push(...Object.values(order.items));
          });
        }
        return null;
      }, state.seat.seats);
      return result;
    },
  ],
  (billItems) => {
    return R.filter(o => o.selected, billItems);
  },
)

export const selectedSeats = createSelector(
  [
    (state) => state.seat.seats,
  ],
  (seats) => {
    return R.filter(o => o.selected, seats);
  },
)

export const checkSelecting = createSelector(
  [
    selectedBillItems,
  ],
  (billItems) => {
    return billItems.length > 0;
  }
)
