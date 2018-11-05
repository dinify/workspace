// @flow
import R from 'ramda';
import types from './types';
import cartTypes from '../cart/types';
import uiTypes from '../ui/types';
import { selectedBillItems } from 'ducks/seat/selectors';

const initialState = {
  seats: [],
  lastCartItems: [],
  lastOrders: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case cartTypes.ORDER_INIT: {
      return R.assoc('lastCartItems', action.payload)(state);
    }
    case cartTypes.ORDER_DONE: {
      const order = action.payload;
      order.items = state.lastCartItems;
      return R.assocPath(['lastOrders', action.payload.id], order)(state);
    }
    case uiTypes.CONFIRMED_PAYMENT_DONE: {
      return R.assocPath(['seats', 0, 'bill'], null)(R.assocPath(['seats', 0, 'paid'], true)(state));
    }
    case uiTypes.CONFIRMED_ORDER_DONE: {
      let bill = state.seats[0].bill;
      if (bill === null) bill = { items: [], subtotal: { amount: '0.00', currency: 'KWD'} };
      const order = state.lastOrders[action.payload.order_id];
      if (order) {
        let cumulative = 0;
        order.items.forEach(item => {
            const newItem = {
              divisor: 1,
              subtotal: item.subtotal,
              order_item: item
            };
            bill.items.unshift(newItem);
            cumulative += parseFloat(item.subtotal.amount);
          }
        );
        bill.subtotal.amount = `${parseFloat(bill.subtotal.amount) + cumulative}`;
      }
      else {
        // TODO: refresh bill
      }
      return R.assocPath(['seats', 0, 'bill'], bill)(state);
    }
    case types.FETCH_SEATS_DONE: {
      const seats = action.payload.res;
      return R.assoc('seats', seats)(state);
    }
    case types.SELECT_BILLITEM: {
      const { selected, seatIndex, billItemIndex } = action.payload;
      const newState =  R.assocPath(['seats', seatIndex, 'bill', 'items', billItemIndex, 'selected'], selected)(state);
      if (selectedBillItems({seat: newState}).length <= 0) {
        for (let i = 0; i < newState.seats.length; i += 1) {
          newState.seats[i].selected = false;
        }
      }
      else {
        newState.seats[0].selected = true;
      }
      return newState;
    }
    case types.SELECT_SEAT: {
      const { selected, seatIndex } = action.payload;
      if (seatIndex === 0) return state;
      return R.assocPath(['seats', seatIndex, 'selected'], selected)(state);
    }
    case types.CLEAR_SELECTED_BILLITEMS: {
      // TODO: ramda impl
      const newState = Object.assign({}, state);
      for (let i = 0; i < state.seats.length; i += 1) {
        newState.seats[i].selected = false;
        if (state.seats[i].bill && state.seats[i].bill.items) {
          for (let j = 0; j < state.seats[i].bill.items.length; j += 1) {
            newState.seats[i].bill.items[j].selected = false;
          }
        }
      }
      return newState;
    }
    default:
      return state;
  }
}
