import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
import { ListToMap } from '@dinify/common/src/lib/FN';
import { confirmOrderAsync, orderReceivedAction, fetchOrdersAsync } from './actions';
import { getType } from 'typesafe-actions';

const initialState: any = {
  all: {},
  confirming: {}
}

export default function reducer(state = initialState, action: any) {

  const { type, payload } = action;

  switch (type) {

    case getType(fetchOrdersAsync.success): {
      const list = payload;
      return assoc('all', mergeDeepRight(state.all, ListToMap(list)))(state);
    }

    case getType(orderReceivedAction): {
      const { order } = payload;
      return assocPath(['all', order.id], order)(state);
    }

    case getType(confirmOrderAsync.request): {
      const { orderId } = payload;
      return assocPath(['confirming', orderId], true)(state);
    }    

    case getType(confirmOrderAsync.success): {
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
