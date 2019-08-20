import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import { ListToMap } from '@dinify/common/dist/lib/FN';
import * as callTypes from 'ducks/call/types';
import * as commonTypes from 'ducks/common/types';

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case callTypes.LOAD_CALL_DONE: {
      const list = payload.res;
      return assoc('all', ListToMap(list))(state)
    }

    case callTypes.CALL_RECEIVED: {
      const { call } = payload;
      return assocPath(['all', call.id], call)(state);
    }

    case callTypes.CALL_CONFIRMATION_INIT: {
      const { callId } = payload;
      return assocPath(['all', callId, 'status'], 'CONFIRMED')(state);
    }

    case commonTypes.CONFIRMATION_DONE: {
      if (payload.type !== 'Call') return state;
      const { callId } = payload;
      return assocPath(['all', callId, 'status'], 'CONFIRMED')(state);
    }

    default:
      return state;
  }

}
