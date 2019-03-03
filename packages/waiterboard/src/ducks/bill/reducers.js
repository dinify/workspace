import { ListToMap } from 'lib/FN'
import types from './types';
import mergeDeepRight from 'ramda/src/mergeDeepRight'
import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_BILL_DONE': {
      const list = action.payload.res;
      return assoc('all', mergeDeepRight(state.all, ListToMap(list)))(state);
    }

    case 'FETCH_TODAYBILLS_DONE': {
      const list = action.payload.res;
      return assoc('all', mergeDeepRight(state.all, ListToMap(list)))(state);
    }

    case types.PAYMENT_RECEIVED: {
      const { payment } = action.payload;
      return assocPath(['all', payment.id], payment)(state);
    }

    case 'BILL_CONFIRMATION_INIT': {
      const { billId } = action.payload;
      return assocPath(['all', billId, 'status'], 'PROCESSED')(state);
    }

    default:
      return state;
  }
}
