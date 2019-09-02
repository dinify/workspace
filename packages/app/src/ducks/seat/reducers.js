import { getType } from 'typesafe-actions';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import findIndex from 'ramda/src/findIndex';
import propEq from 'ramda/src/propEq';
import append from 'ramda/src/append';
import remove from 'ramda/src/remove';
import forEach from 'ramda/src/forEach';
import { selectedBillItems } from 'ducks/seat/selectors';
import { orderAsync, rmFromCartAsync } from 'ducks/cart/actions.ts';
import types from './types';
import billTypes from '../bill/types';
import * as serviceTypes from '../service/types';
import wsTypes from '../../websockets/types';

const initialState = {
  seats: [],
  checkedin: false,
  services: {}
};

export default function reducer(state = initialState, action) {

  switch (action.type) {

    case getType(orderAsync.request): {
      return assoc('lastCartItems', action.payload)(state);
    }

    // case cartTypes.ORDER_DONE: {
    //   // the cart gets cleared by SEATS action (downstream websocket)
    //   // return dissocPath(['seats', '0', 'cart'])(state);
    //   return state;
    // }

    case getType(rmFromCartAsync.success): {
      return assocPath(['seats', '0', 'cart'], action.payload)(state);
    }

    case serviceTypes.CALL_SERVICE_INIT: {
      const serviceId = action.payload.serviceId;
      return assocPath(['services', serviceId], {id: serviceId, status: 'LOADING', calls: {}})(state);
    }

    case serviceTypes.CALL_SERVICE_DONE: {
      const call = action.payload;
      const newState = assocPath(['services', call.service_id, 'calls', call.id], call)(state);
      return assocPath(['services', call.service_id, 'status'], 'SENT')(newState);
    }

    case wsTypes.CONFIRMED_CALL: {
      const call = action.payload.call;
      const newState = assocPath(['services', call.service_id, 'calls', call.id], call)(state);
      return assocPath(['services', call.service_id, 'status'], 'READY')(newState);
    }

    case wsTypes.SEATS:
    case wsTypes.SPLIT:
    case wsTypes.CONFIRMED_ORDER:
    case wsTypes.CONFIRMED_PAYMENT: {
      return assocPath(['seats'], action.payload.seats)(state);
    }

    case wsTypes.CHECKIN: {
      const seat = action.payload.seat;
      let newState = state;
      if (findIndex(propEq('id', seat.id))(state.seats) < 0) {
          newState = assocPath(['seats'], append(seat, state.seats))(state);
      }
      if (action.payload.me) newState = assocPath(['checkedin'], true)(newState);
      return newState;
    }

    case wsTypes.CHECKOUT: {
      const seat = action.payload.seat;
      return assoc('seats', remove(findIndex(propEq('id', seat.id))(state.seats), 1, state.seats))(state);
    }

    case wsTypes.CHECKOUT_ALL: {
      return assoc('seats', [])(assoc('checkedin', false)(state));
    }

    case types.FETCH_SEATS_DONE: {
      const seats = action.payload.res;
      return assoc('seats', seats)(assoc('checkedin', true)(state));
    }

    case types.FETCH_SEATS_FAIL: {
      return assoc('checkedin', false)(state);
    }

    case types.SELECT_BILLITEM: {
      const { selected, path } = action.payload;
      const seat = state.seats[path[1]];
      const billItem = seat.bill.orders[path[4]].items[path[6]];
      const newState =  assocPath(path, selected)(state);
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
      return assocPath(['seats', seatIndex, 'selected'], selected)(state);
    }

    case billTypes.SPLIT_BILL_INIT: {
      return assocPath(['splitLoading'], true)(state);
    }

    case billTypes.SPLIT_BILL_DONE: {
      return assocPath(['seats'], action.payload.seats)(assocPath(['splitLoading'], false)(state));
    }

    case billTypes.SPLIT_BILL_FAIL: {
      return assocPath(['splitLoading'], false)(state);
    }

    case types.CLEAR_SELECTED_BILLITEMS: {
      // TODO: ramda impl
      let newState = state;
      forEach((seat, seatIndex) => {
        if (seat.bill) forEach(order => {
          forEach(item => {
            newState = assocPath(['seats', seatIndex, 'bill', 'orders', order.id, 'items', item.id, 'selected'], false)(newState);
          }, Object.values(order.items));
        }, Object.values(seat.bill.orders));
      }, state.seats);
      return newState;
    }

    default:
      return state;

  }
}
