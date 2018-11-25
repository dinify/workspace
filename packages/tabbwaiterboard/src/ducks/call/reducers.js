import assoc from 'ramda/src/assoc'
import find from 'ramda/src/find'
import findIndex from 'ramda/src/findIndex'
import propEq from 'ramda/src/propEq'
import assocPath from 'ramda/src/assocPath'
import types from './types';

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_CALL_DONE': {
      const calls = action.payload.res;
      return assoc('list', calls)(state);
    }

    case types.CALL_RECEIVED: {
      const { call } = action.payload;
      if (find(propEq('id', call.id))(state.list)) return state;
      return assoc('list', [...state.list, call])(state);
    }

    case 'CONFIRM_CALL_INIT': {
      const { callId } = action.payload;
      const index = findIndex(propEq('id', callId))(state.list);
      return assocPath(['list', index, 'status'], 'CONFIRMED')(state);
    }

    default:
      return state;
  }
}
