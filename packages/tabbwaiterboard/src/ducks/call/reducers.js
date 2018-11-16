import R from 'ramda'
import types from './types';

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_CALL_DONE': {
      const calls = action.payload.res;
      return R.assoc('list', calls)(state);
    }

    case types.CALL_RECEIVED: {
      const { call } = action.payload;
      if (R.find(R.propEq('id', call.id))(state.list)) return state;
      return R.assoc('list', [...state.list, call])(state);
    }

    case 'CONFIRM_CALL_INIT': {
      const { callId } = action.payload;
      const index = R.findIndex(R.propEq('id', callId))(state.list);
      return R.assocPath(['list', index, 'status'], 'CONFIRMED')(state);
    }

    default:
      return state;
  }
}
