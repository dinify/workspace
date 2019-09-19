import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
import { ListToMap } from '@dinify/common/dist/lib/FN';
import * as orderTypes from 'ducks/order/types';
import * as commonTypes from 'ducks/common/types';

const initialState = {
  all: {},
  confirming: {}
}

export default function reducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case orderTypes.LOAD_ORDER_DONE: {
      const list = payload.res;
      return assoc('all', mergeDeepRight(state.all, ListToMap(list)))(state);
    }

    case orderTypes.ORDER_RECEIVED: {
      const { order } = payload;
      return assocPath(['all', order.id], order)(state);
    }

    case orderTypes.ORDER_CONFIRMATION_INIT: {
      const { orderId } = payload;
      return assocPath(['confirming', orderId], true)(state);
    }    

    case commonTypes.CONFIRMATION_DONE: {
      if (payload.type !== 'Order') return state;
      const { orderId } = payload;
      return pipe(
        assocPath(['confirming', orderId], false),
        assocPath(['all', orderId, 'status'], 'CONFIRMED')
      )(state);
    }

    default:
      return state;
  }

}
