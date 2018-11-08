import R from 'ramda'
import { UpdateOriginal } from 'lib/FN'

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_ORDERS_DONE': {
      const payload = action.payload;
      return R.assoc('list', payload)(state);
    }

    case 'ORDER_CONFIRMATION_INIT': {
      const { orderId } = action.payload;
      const newList = R.filter((o) => o.id !== orderId, state.list);
      return R.assoc('list', newList)(state);
    }

    default:
      return state;
  }
}