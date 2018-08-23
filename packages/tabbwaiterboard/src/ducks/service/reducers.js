import R from 'ramda'

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_CALLS_DONE': {
      const payload = action.payload;
      return R.assoc('list', payload)(state);
    }

    case 'CONFIRM_CALL_INIT': {
      const { callId } = action.payload;
      const newList = R.filter((o) => o.id !== callId, state.list);
      return R.assoc('list', newList)(state);
    }

    default:
      return state;
  }
}
