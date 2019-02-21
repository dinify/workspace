import { createSelector } from 'reselect';
import * as R from 'ramda';

export const selectedBillItems = createSelector(
  [
    (state) => {
      const result = [];
      if (state.seat.seats) R.forEach(seat => {
        if (seat.bill) R.forEach(order => {
          R.forEach(item => {
            result.push(item);
          }, Object.values(order.items))
        }, Object.values(seat.bill.orders))
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
