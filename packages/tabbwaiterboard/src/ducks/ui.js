// @flow
import R from 'ramda'
import type { Action } from '../flow'


type State = {
  all: Object
};

const initialState = {
  frameIndex: 1,
  modalOpen: false,
  modalType: null,
  modalPayload: {},
  waiterboardName: null,
  billsOfTable: []
};

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {

    case 'TOGGLE_FRAMES': {
      return R.assoc('frameIndex', action.payload.i)(state);
    }
    case 'GET_BILLSOFTABLE_DONE':
      return R.assoc('billsOfTable', action.payload)(state);
    case 'TOGGLE_MODAL': {
      const { open, type } = action.payload;
      if(!open) state = R.assoc('billsOfTable', [])(state)
      return R.evolve({
        modalOpen: R.always(open),
        modalType: open ? R.always(type) : R.always(''),
        modalPayload: open ? R.always(action.payload) : R.always({}),
      })(state);
    }

    default:
      return state;
  }
}


// Action Creators

export const toggleFrames = (i) => {
  return {
    type: 'TOGGLE_FRAMES',
    payload: { i }
  };
}

export const toggleModal = (payload) => {
  return {
    type: 'TOGGLE_MODAL',
    payload // { open, userId }
  };
}
