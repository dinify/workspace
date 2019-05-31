
import * as R from 'ramda';
import { selectedBillItems } from 'ducks/seat/selectors';
import types from './types';
import billTypes from '../bill/types';
import cartTypes from '../cart/types';
import serviceTypes from '../service/types';
import wsTypes from '../../websockets/types';

const initialState = {
  seats: [],
  checkedin: false,
  services: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case cartTypes.ORDER_INIT: {
      return R.assoc('lastCartItems', action.payload)(state);
    }
    case cartTypes.ORDER_DONE: {
      // the cart gets cleared by SEATS action (downstream websocket)
      // return R.dissocPath(['seats', '0', 'cart'])(state);
      return state;
    }
    case serviceTypes.CALL_SERVICE_INIT: {
      const serviceId = action.payload.serviceId;
      return R.assocPath(['services', serviceId], {id: serviceId, status: 'LOADING', calls: {}})(state);
    }
    case serviceTypes.CALL_SERVICE_DONE: {
      const call = action.payload;
      const newState = R.assocPath(['services', call.service_id, 'calls', call.id], call)(state);
      return R.assocPath(['services', call.service_id, 'status'], 'SENT')(newState);
    }
    case wsTypes.CONFIRMED_CALL: {
      const call = action.payload.call;
      const newState = R.assocPath(['services', call.service_id, 'calls', call.id], call)(state);
      return R.assocPath(['services', call.service_id, 'status'], 'READY')(newState);
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
      let newState = state;
      if (R.findIndex(R.propEq('id', seat.id))(state.seats) < 0) {
          newState = R.assocPath(['seats'], R.append(seat, state.seats))(state);
      }
      if (action.payload.me) newState = R.assocPath(['checkedin'], true)(newState);
      return newState;
    }
    case wsTypes.CHECKOUT: {
      const seat = action.payload.seat;
      return R.assoc('seats', R.remove(R.findIndex(R.propEq('id', seat.id))(state.seats), 1, state.seats))(state);
    }
    case wsTypes.CHECKOUT_ALL: {
      return R.assoc('seats', [])(R.assoc('checkedin', false)(state));
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
