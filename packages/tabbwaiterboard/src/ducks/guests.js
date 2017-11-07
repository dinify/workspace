// @flow

import R from 'ramda';

import type { Action } from '../flow';

type State = {
  all: Object
};

const initialState = {
  all: {}
};

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case 'GUESTS_POLLING_RESULTS': {
      const guestsObject = {}
      action.payload.forEach((guest) => {
        guestsObject[guest.UserObject.id] = guest
        if(state.all[guest.UserObject.id] && state.all[guest.UserObject.id].bills) {
          guestsObject[guest.UserObject.id].bills = state.all[guest.UserObject.id].bills
        }
      })
      return R.assoc('all', guestsObject)(state);
    }

    case 'GET_BILLSOFUSER_DONE': {
      const { userId, bills } = action.payload;
      return R.assocPath(['all',userId, 'bills'], bills)(state);
    }

    case 'CLEAR_TABLE_DONE': {
      const tableId = action.payload.table.id
      const removeIds = R.values(state.all).filter((g) => g.tables === tableId).map((g) => g.UserObject.id)
      removeIds.forEach((gId) => {
        state = R.assocPath(['all', gId, 'tables'], -1)(state);
      })
      return state
    }

    default:
      return state;
  }
}
