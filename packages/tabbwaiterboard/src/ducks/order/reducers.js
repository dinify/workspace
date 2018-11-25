import assoc from 'ramda/src/assoc'
import find from 'ramda/src/find'
import filter from 'ramda/src/filter'
import propEq from 'ramda/src/propEq'
import { UpdateOriginal } from 'lib/FN'
import types from './types';

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_ORDERS_DONE': {
      const payload = action.payload;
      return assoc('list', payload)(state);
    }

    case types.ORDER_RECEIVED: {
      const { order } = action.payload;
      if (find(propEq('id', order.id))(state.list)) return state;
      return assoc('list', [...state.list, order])(state);
    }

    case 'ORDER_CONFIRMATION_INIT': {
      const { orderId } = action.payload;
      const newList = filter((o) => o.id !== orderId, state.list);
      return assoc('list', newList)(state);
    }

    default:
      return state;
  }
}
