import assoc from 'ramda/src/assoc';
import filter from 'ramda/src/filter';
import { ListToMap } from '@dinify/common/dist/lib/FN';
import * as seatTypes from 'ducks/seat/types';
import * as tableTypes from 'ducks/table/types';

const initialState = {
  all: {}
};

export default function reducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case seatTypes.LOAD_SEATS_DONE: {
      const list = payload.res;
      return assoc('all', ListToMap(list))(state);
    }

    // case 'SEAT_RECEIVED': {
    //   const { seat } = action.payload;
    //   return assocPath(['all', seat.id], seat)(state);
    // }

    case tableTypes.CLEAR_TABLE_DONE: {
      const tableId = payload.table.id;
      const filteredGuests = filter((guest) => guest.table_id !== tableId, state.all);
      return assoc('all', filteredGuests)(state);
    }

    default:
      return state;
  }
  
}
