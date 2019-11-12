import { getType } from 'typesafe-actions';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import findIndex from 'ramda/es/findIndex';
import propEq from 'ramda/es/propEq';
import append from 'ramda/es/append';
import remove from 'ramda/es/remove';
import forEach from 'ramda/es/forEach';
import { selectedBillItems } from 'features/seat/selectors';
import { orderAsync, rmFromCartAsync } from 'features/cart/actions.ts';
import types from './types';
import * as wsActions from '../socket/actions';

const initialState = {
  seats: [],
  checkedin: false,
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

    case getType(wsActions.seatsAction):
    case getType(wsActions.splitAction):
    case getType(wsActions.confirmedOrderAction):
    case getType(wsActions.confirmedPaymentAction): {
      return assocPath(['seats'], action.payload.seats)(state);
    }

    case getType(wsActions.checkinAction): {
      const seat = action.payload.seat;
      let newState = state;
      if (findIndex(propEq('id', seat.id))(state.seats) < 0) {
          newState = assocPath(['seats'], append(seat, state.seats))(state);
      }
      if (action.payload.me) newState = assocPath(['checkedin'], true)(newState);
      return newState;
    }

    case getType(wsActions.checkoutAction): {
      const seat = action.payload.seat;
      return assoc('seats', remove(findIndex(propEq('id', seat.id))(state.seats), 1, state.seats))(state);
    }

    case getType(wsActions.checkoutAllAction): {
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

    // case billTypes.SPLIT_BILL_INIT: {
    //   return assocPath(['splitLoading'], true)(state);
    // }
    // case billTypes.SPLIT_BILL_DONE: {
    //   return assocPath(['seats'], action.payload.seats)(assocPath(['splitLoading'], false)(state));
    // }
    // case billTypes.SPLIT_BILL_FAIL: {
    //   return assocPath(['splitLoading'], false)(state);
    // }

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
