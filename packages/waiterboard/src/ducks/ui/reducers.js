import assoc from 'ramda/src/assoc';
import evolve from 'ramda/src/evolve';
import always from 'ramda/src/always';
import * as types from './types';

const initialState = {
  frameIndex: 1,
  modalOpen: false,
  modalType: null,
  modalPayload: {},
  waiterboardName: null,
  billsOfTable: []
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {

    case types.TOGGLE_FRAMES: {
      return assoc('frameIndex', action.payload.i)(state);
    }
    case 'GET_BILLSOFTABLE_DONE':
      return assoc('billsOfTable', action.payload)(state);
    case types.TOGGLE_MODAL: {
      const { open, type } = action.payload;
      if (!open) state = assoc('billsOfTable', [])(state);
      return evolve({
        modalOpen: always(open),
        modalType: open ? always(type) : always(''),
        modalPayload: open ? always(action.payload) : always({}),
      })(state);
    }

    default:
      return state;
  }
}