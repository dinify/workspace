import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import types from './types';
import { UpdateOriginal } from 'lib/FN'

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_CALL_DONE': {
      const list = action.payload.res;
      return assoc('all', UpdateOriginal(state.all, list))(state)
    }

    case types.CALL_RECEIVED: {
      const { call } = action.payload;
      return assocPath(['all', call.id], call)(state);
    }

    case 'CONFIRM_CALL_INIT': {
      const { callId } = action.payload;
      return assocPath(['all', callId, 'status'], 'CONFIRMED')(state);
    }

    default:
      return state;
  }
}
