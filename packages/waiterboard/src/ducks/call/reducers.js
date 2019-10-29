import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc'
import assocPath from 'ramda/es/assocPath'
import { ListToMap } from '@dinify/common/src/lib/FN';
import * as callTypes from 'ducks/call/types';
import * as commonTypes from 'ducks/common/types';

const initialState = {
  all: {},
  confirming: {}
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
      return assocPath(['confirming', callId], true)(state);
    }

    case commonTypes.CONFIRMATION_DONE: {
      if (payload.type !== 'Call') return state;
      const { callId } = payload;
      return pipe(
        assocPath(['confirming', callId], false),
        assocPath(['all', callId, 'status'], 'CONFIRMED')
      )(state);
    }

    default:
      return state;
  }

}
