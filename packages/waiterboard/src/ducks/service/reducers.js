import assoc from 'ramda/src/assoc'
import filter from 'ramda/src/filter'

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_CALLS_DONE': {
      const payload = action.payload;
      return assoc('list', payload)(state);
    }

    case 'CONFIRM_CALL_INIT': {
      const { callId } = action.payload;
      const newList = filter((o) => o.id !== callId, state.list);
      return assoc('list', newList)(state);
    }

    default:
      return state;
  }
}
