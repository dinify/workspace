import R from 'ramda'
import types from './types';

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_SEATS_DONE': {
      const list = action.payload.res;
      return R.assoc('list', list)(state);
    }

    case 'SEAT_RECEIVED': {
      const { seat } = action.payload;
      const seatIndex = R.findIndex(R.propEq('id', seat.id))(state.list);
      if (seatIndex > -1) return R.assocPath(['list', seatIndex], seat)(state);
      return R.assoc('list', [...state.list, seat])(state);
    }

    case 'CLEAR_TABLE_DONE': {
      const tableId = action.payload.table.id;
      const filteredGuests = R.filter((guest) => guest.table_id !== tableId, state.list);
      return R.assoc('list', filteredGuests)(state);
    }

    default:
      return state;
  }
}
