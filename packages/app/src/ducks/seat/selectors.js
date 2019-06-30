import { createSelector } from 'reselect';
import filter from 'ramda/src/filter';
import forEach from 'ramda/src/forEach';

export const selectedBillItems = createSelector(
  [
    (state) => {
      const result = [];
      if (state.seat.seats) forEach(seat => {
        if (seat.bill) forEach(order => {
          forEach(item => {
            result.push(item);
          }, Object.values(order.items))
        }, Object.values(seat.bill.orders))
      }, state.seat.seats);
      return result;
    },
  ],
  (billItems) => {
    return filter(o => o.selected, billItems);
  },
)

export const selectedSeats = createSelector(
  [
    (state) => state.seat.seats,
  ],
  (seats) => {
    return filter(o => o.selected, seats);
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
