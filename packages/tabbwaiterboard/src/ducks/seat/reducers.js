import assoc from 'ramda/src/assoc'
import filter from 'ramda/src/filter'
import findIndex from 'ramda/src/findIndex'
import propEq from 'ramda/src/propEq'
import assocPath from 'ramda/src/assocPath'

import types from './types';

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_SEATS_DONE': {
      const list = action.payload.res;
      return assoc('list', list)(state);
    }

    case 'SEAT_RECEIVED': {
      const { seat } = action.payload;
      const seatIndex = findIndex(propEq('id', seat.id))(state.list);
      if (seatIndex > -1) return assocPath(['list', seatIndex], seat)(state);
      return assoc('list', [...state.list, seat])(state);
    }

    case 'CLEAR_TABLE_DONE': {
      const tableId = action.payload.table.id;
      const filteredGuests = filter((guest) => guest.table_id !== tableId, state.list);
      return assoc('list', filteredGuests)(state);
    }

    default:
      return state;
  }
}
