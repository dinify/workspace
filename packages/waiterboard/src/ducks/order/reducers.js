import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import types from './types';
import mergeDeepRight from 'ramda/src/mergeDeepRight'
import { ListToMap } from 'lib/FN'

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_ORDER_DONE': {
      const list = action.payload.res;
      return assoc('all', mergeDeepRight(state.all, ListToMap(list)))(state);
    }

    case types.ORDER_RECEIVED: {
      const { order } = action.payload;
      return assocPath(['all', order.id], order)(state);
    }

    case 'CONFIRMATION_DONE': {
      if (action.payload.type !== 'Order') return state;
      const { orderId } = action.payload;
      return assocPath(['all', orderId, 'status'], 'CONFIRMED')(state);
    }

    default:
      return state;
  }
}
