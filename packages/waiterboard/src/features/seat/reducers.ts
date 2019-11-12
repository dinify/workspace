import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import filter from 'ramda/es/filter';
import { ListToMap } from '@dinify/common/src/lib/FN';
import { checkoutTableAsync, checkoutUserAsync } from '../table/actions';
import { getType } from 'typesafe-actions';
import { seatReceivedAction, fetchSeatsAsync } from './actions';

const initialState: any = {
  all: {}
};

export default function reducer(state = initialState, action: any) {

  const { type, payload } = action;

  switch (type) {

    case getType(fetchSeatsAsync.success): {
      const list = payload;
      return assoc('all', ListToMap(list))(state);
    }

    case getType(seatReceivedAction): {
      const { seat } = action.payload;
      return assocPath(['all', seat.id], seat)(state);
    }

    case getType(checkoutTableAsync.success): {
      const tableId = payload.table.id;
      const filteredGuests = filter((seat: any) => seat.tableId !== tableId, state.all);
      return assoc('all', filteredGuests)(state);
    }

    case getType(checkoutUserAsync.success): {
      const userId = payload.userId;
      const filteredGuests = filter((seat: any) => seat.userId !== userId, state.all);
      return assoc('all', filteredGuests)(state);
    }

    default:
      return state;
  }
  
}
