// import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action: any) {

  const { payload, type } = action;

  switch (type) {

    // case bookingTypes.FETCH_BOOKINGS_DONE: {
    //   const { res } = payload;
    //   return assoc('all', { ...state.all, ...res })(state);
    // }

    case 'CONFIRM_BOOKING_INIT': {
      const { id } = payload;
      return assocPath(['all', id, 'status'], 'CONFIRMED')(state);
    }

    case 'CANCEL_BOOKING_INIT': {
      const { id } = payload;
      return assocPath(['all', id, 'status'], 'CANCELLED')(state);
    }

    default:
      return state;
  }

}
