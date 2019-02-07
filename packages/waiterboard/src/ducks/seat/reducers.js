import assoc from 'ramda/src/assoc'
import filter from 'ramda/src/filter'
import assocPath from 'ramda/src/assocPath'
import { ListToMap } from 'lib/FN'

import types from './types';

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_SEATS_DONE': {
      const list = action.payload.res;
      return assoc('all', ListToMap(list))(state);
    }

    case 'SEAT_RECEIVED': {
      const { seat } = action.payload;
      return assocPath(['all', seat.id], seat)(state);
    }

    case 'CLEAR_TABLE_DONE': {
      const tableId = action.payload.table.id;
      const filteredGuests = filter((guest) => guest.table_id !== tableId, state.all);
      return assoc('all', filteredGuests)(state);
    }

    default:
      return state;
  }
}
