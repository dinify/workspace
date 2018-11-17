// @flow
import R from 'ramda';
import { selectedBillItems } from 'ducks/seat/selectors';
import types from './types';
import billTypes from '../bill/types';
import cartTypes from '../cart/types';
import wsTypes from '../../websockets/types';

const initialState = {
  seats: [],
  checkedin: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case cartTypes.ORDER_INIT: {
      return R.assoc('lastCartItems', action.payload)(state);
    }
    case cartTypes.ORDER_DONE: {
      // return R.dissocPath(['seats', '0', 'cart'])(state);
      return state;
    }
    case cartTypes.REMOVE_ORDERITEM_DONE: {
      return R.assocPath(['seats', '0', 'cart'], action.payload)(state);
    }
    case wsTypes.SEATS:
    case wsTypes.SPLIT:
    case wsTypes.CONFIRMED_ORDER:
    case wsTypes.CONFIRMED_PAYMENT: {
      return R.assocPath(['seats'], action.payload.seats)(state);
    }
    case wsTypes.CHECKIN: {
      const seat = action.payload.seat;
      return R.assocPath(['seats'], R.append(seat, state.seats))(state);
    }
    case wsTypes.CHECKOUT: {
      const seat = action.payload.seat;
      return R.assoc('seats', R.remove(R.findIndex(R.propEq('id', seat.id))(state.seats), 1, state.seats))(state);
    }
    case types.FETCH_SEATS_DONE: {
      const seats = action.payload.res;
      return R.assoc('seats', seats)(R.assoc('checkedin', true)(state));
    }
    case types.FETCH_SEATS_FAIL: {
      return R.assoc('checkedin', false)(state);
    }
    case types.SELECT_BILLITEM: {
      const { selected, path } = action.payload;
      const seat = state.seats[path[1]];
      const billItem = seat.bill.orders[path[4]].items[path[6]];
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
