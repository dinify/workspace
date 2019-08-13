import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import { ListToMap } from '@dinify/common/dist/lib/FN';
import * as types from './types';

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_CALL_DONE': {
      const list = action.payload.res;
      return assoc('all', ListToMap(list))(state)
    }

    case types.CALL_RECEIVED: {
      const { call } = action.payload;
      return assocPath(['all', call.id], call)(state);
    }

    case 'CALL_CONFIRMATION_INIT': {
      const { callId } = action.payload;
      return assocPath(['all', callId, 'status'], 'CONFIRMED')(state);
    }

    case 'CONFIRMATION_DONE': {
      if (action.payload.type !== 'Call') return state;
      const { callId } = action.payload;
      return assocPath(['all', callId, 'status'], 'CONFIRMED')(state);
    }

    default:
      return state;
  }
}
