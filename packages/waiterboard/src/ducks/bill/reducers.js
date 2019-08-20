import { ListToMap } from '@dinify/common/dist/lib/FN';
import mergeDeepRight from 'ramda/src/mergeDeepRight';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import * as billTypes from 'ducks/bill/types';
import * as commonTypes from 'ducks/common/types';

const initialState = {
  all: {}
}

export default function reducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case billTypes.LOAD_BILL_DONE: {
      const list = payload.res;
      return assoc('all', mergeDeepRight(state.all, ListToMap(list)))(state);
    }

    case billTypes.FETCH_TODAYBILLS_DONE: {
      const list = payload.res;
      return assoc('all', mergeDeepRight(state.all, ListToMap(list)))(state);
    }

    case billTypes.PAYMENT_RECEIVED: {
      const { payment } = payload;
      return assocPath(['all', payment.id], payment)(state);
    }

    case commonTypes.CONFIRMATION_DONE: {
      if (payload.type !== 'Bill') return state;
      const { billId } = payload;
      return assocPath(['all', billId, 'status'], 'PROCESSED')(state);
    }

    default:
      return state;
  }

}
