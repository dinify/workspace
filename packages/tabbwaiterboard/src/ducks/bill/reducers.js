import R from 'ramda'
import { UpdateOriginal } from 'lib/FN'
import types from './types';

const initialState = {
  list: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_BILLS_DONE': {
      const payload = action.payload;
      return R.assoc('list', payload)(state);
    }

    case types.PAYMENT_RECEIVED: {
      const { payment } = action.payload;
      console.log('111');
      if (R.find(R.propEq('id', payment.id))(state.list)) return state;
      console.log('222');
      return R.assoc('list', [...state.list, payment])(state);
    }

    case 'BILL_CONFIRMATION_INIT': {
      const { billId } = action.payload;
      const newList = R.filter((o) => o.id !== billId, state.list);
      return R.assoc('list', newList)(state);
    }

    default:
      return state;
  }
}
