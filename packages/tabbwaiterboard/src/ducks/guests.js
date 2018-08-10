// @flow

import R from 'ramda';

import type { Action } from '../flow';

type State = {
  all: Object
};

const initialState = {
  list: []
};

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case 'GUESTS_POLLING_RESULTS': {
      const list = action.payload;
      return R.assoc('list', list)(state);
    }

    case 'CLEAR_TABLE_DONE': {
      const tableId = action.payload.table.id;
      const filteredGuests = R.filter((guest) => guest.table_id !== tableId, state.list);
      return R.assoc('list', filteredGuests)(state);
    }

    //case 'GET_BILLSOFUSER_DONE': {
    //  const { userId, bills } = action.payload;
    //  return R.assocPath(['all', userId, 'bills'], bills)(state);
    //}
    //case 'GET_ORDERSOFUSER_DONE': {
    //  const { userId, orders } = action.payload;
    //  return R.assocPath(['all', userId, 'orders'], orders)(state);
    //}

    default:
      return state;
  }
}
