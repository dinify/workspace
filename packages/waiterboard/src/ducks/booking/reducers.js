import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import * as types from './types';

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {

    case types.FETCH_BOOKINGS_DONE: {
      const { res } = payload;
      return assoc('all', { ...state.all, ...res })(state);
    }

    case types.CONFIRM_BOOKING_INIT: {
      const { id } = payload;
      return assocPath(['all', id, 'status'], 'CONFIRMED')(state);
    }

    case types.CANCEL_BOOKING_INIT: {
      const { id } = payload;
      return assocPath(['all', id, 'status'], 'CANCELLED')(state);
    }

    default:
      return state;
  }
}
