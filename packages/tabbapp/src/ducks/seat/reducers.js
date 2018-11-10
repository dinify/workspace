// @flow
import R from 'ramda';
import * as FN from 'tabb-front/dist/lib/FN';
import types from './types';
import billTypes from '../bill/types';
import cartTypes from '../cart/types';
import wsTypes from '../../websockets/types';
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
      const newState = R.assocPath(['seats', 0, 'cart'], undefined)(state);
      return R.assocPath(['lastOrders', action.payload.id], order)(newState);
    }
    case cartTypes.REMOVE_ORDERITEM_DONE: {
      // TODO replace cart with cart in respose
      const { orderItemId } = action.payload;
      const amount = state.subtotal.amount;
      const rid = 'ac2de299-f8b6-4d86-a7d9-be1be17692f1';
      const itemAmount = state.seats[0].restaurants[rid].items[orderItemId].subtotal.amount;
      return R.assocPath(['seats', 0, 'cart', 'subtotal', 'amount'], amount - itemAmount)(
        R.dissocPath(['seats', 0, 'cart', 'restaurants', rid, 'items', orderItemId])(state)
      );
    }
    case wsTypes.CONFIRMED_PAYMENT: {
      return R.assocPath(['seats', 0, 'bill'], null)(R.assocPath(['seats', 0, 'paid'], true)(state));
    }
    case wsTypes.CONFIRMED_ORDER: {
      return R.assocPath(['seats', 0, 'bill'], action.payload.bill)(state);
    }
    case wsTypes.SPLIT: {
      return R.assocPath(['seats'], action.payload.seats)(state);
    }
    case types.FETCH_SEATS_DONE: {
      const seats = action.payload.res;
      return R.assoc('seats', seats)(state);
    }
    case types.SELECT_BILLITEM: {
      const { selected, path } = action.payload;
      const seat = state.seats[path[1]];
      const billItem = seat.bill.orders[path[4]].items[path[6]];
      const selectable = path[1] === 0 && billItem.initiator === seat.user_id;
      if (!selectable) return state;
      const newState =  R.assocPath(path, selected)(state);
      if (selectedBillItems({seat: newState}).length <= 0) {
        for (let i = 0; i < newState.seats.length; i += 1) {
          newState.seats[i].selected = false;
        }
      }
      else {
        Object.keys(billItem.owners).forEach(uid => {
          newState.seats.forEach((seat, index) => {
            if (uid === seat.user_id) newState.seats[index].selected = true;
          })
        });
        newState.seats[0].selected = true;
      }
      return newState;
    }
    case types.SELECT_SEAT: {
      const { selected, seatIndex } = action.payload;
      if (seatIndex === 0) return state;
      return R.assocPath(['seats', seatIndex, 'selected'], selected)(state);
    }
    case billTypes.SPLIT_BILL_INIT: {
      return R.assocPath(['splitLoading'], true)(state);
    }
    case billTypes.SPLIT_BILL_DONE: {
      return R.assocPath(['seats'], action.payload.seats)(R.assocPath(['splitLoading'], false)(state));
    }
    case billTypes.SPLIT_BILL_FAIL: {
      return R.assocPath(['splitLoading'], false)(state);
    }
    case types.CLEAR_SELECTED_BILLITEMS: {
      // TODO: ramda impl
      let newState = state;
      R.forEach((seat, seatIndex) => {
        if (seat.bill) R.forEach(order => {
          R.forEach(item => {
            newState = R.assocPath(['seats', seatIndex, 'bill', 'orders', order.id, 'items', item.id, 'selected'], false)(newState)
          }, Object.values(order.items))
        }, Object.values(seat.bill.orders))
      }, state.seats);
      return newState;
    }
    default:
      return state;
  }
}
