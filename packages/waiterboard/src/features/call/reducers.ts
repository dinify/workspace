import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc'
import assocPath from 'ramda/es/assocPath'
import { ListToMap } from '@dinify/common/src/lib/FN';
import { getType } from 'typesafe-actions';
import { fetchCallsAsync, callReceivedAction, confirmCallAsync } from './actions';

const initialState = {
  all: {},
  confirming: {}
}

export default function reducer(state = initialState, action: any) {

  const { type, payload } = action;

  switch (type) {

    case getType(fetchCallsAsync.success): {
      const list = payload;
      return assoc('all', ListToMap(list))(state)
    }

    case getType(callReceivedAction): {
      const { call } = payload;
      return assocPath(['all', call.id], call)(state);
    }

    case getType(confirmCallAsync.request): {
      const { callId } = payload;
      return assocPath(['confirming', callId], true)(state);
    }

    case getType(confirmCallAsync.success): {
      const { callId } = payload;
      return pipe(
        assocPath(['confirming', callId], false),
        assocPath(['all', callId, 'status'], 'CONFIRMED')
      )(state);
    }

    case getType(confirmCallAsync.failure): {
      const { callId } = action.initPayload;
      if (!callId) return state;
      if (payload.message && payload.message.includes('already')) {
        return pipe(
          assocPath(['confirming', callId], false),
          assocPath(['all', callId, 'status'], 'CONFIRMED')
        )(state);
      }
      return state;
    }

    default:
      return state;
  }

}
