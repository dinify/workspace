import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import { UpdateOriginal } from 'lib/FN'

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_BOOKING_DONE': {
      const payload = action.payload.res;
      return assoc('all', UpdateOriginal(state.all, payload))(state);
    }

    case 'CONFIRM_BOOKING_INIT': {
      const { id } = action.payload;
      return assocPath(['all', id, 'status'], 'CONFIRMED')(state);
    }

    case 'CANCEL_BOOKING_INIT': {
      const { id } = action.payload;
      return assocPath(['all', id, 'status'], 'CANCELLED')(state);
    }

    default:
      return state;
  }
}
