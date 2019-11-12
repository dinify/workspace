import pipe from 'ramda/es/pipe';
import { ListToMap } from '@dinify/common/src/lib/FN';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import { getType } from 'typesafe-actions';
import { fetchBillsAsync, billReceivedAction, confirmBillAsync } from './actions';

const initialState = {
  all: {},
  confirming: {}
}

export default function reducer(state = initialState, action: any) {

  const { type, payload } = action;

  switch (type) {

    case getType(fetchBillsAsync.success): {
      const list = payload.res;
      return assoc('all', mergeDeepRight(state.all, ListToMap(list)))(state);
    }

    case getType(billReceivedAction): {
      const payment = payload;
      return assocPath(['all', payment.id], payment)(state);
    }

    case getType(confirmBillAsync.request): {
      const { billId } = payload;
      return assocPath(['confirming', billId], true)(state);
    }

    case getType(confirmBillAsync.success): {
      if (!(payload.type === 'CASH' || payload.type === 'CARD')) return state;
      const { billId } = payload;
      return pipe(
        assocPath(['confirming', billId], false),
        assocPath(['all', billId, 'status'], 'PROCESSED')
      )(state);
    }

    default:
      return state;
  }

}
