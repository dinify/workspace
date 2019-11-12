import assoc from 'ramda/es/assoc';
import evolve from 'ramda/es/evolve';
import always from 'ramda/es/always';
import * as types from './types';

const initialState = {
  frameIndex: 1,
  modalOpen: false,
  modalType: null,
  modalPayload: {},
  waiterboardName: null,
};

export default function reducer(state = initialState, action: any) {

  const { type, payload } = action;

  switch (type) {

    case types.TOGGLE_FRAMES: {
      return assoc('frameIndex', payload.i)(state);
    }

    case types.TOGGLE_MODAL: {
      const { open, type } = payload;
      return evolve({
        modalOpen: always(open),
        modalType: open ? always(type) : always(''),
        modalPayload: open ? always(payload) : always({}),
      })(state);
    }

    default:
      return state;
  }

}
