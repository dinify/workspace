import pipe from 'ramda/es/pipe';
import { ListToMap } from '@dinify/common/dist/lib/FN';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import * as billTypes from 'ducks/bill/types';
import * as commonTypes from 'ducks/common/types';

const initialState = {
  all: {},
  confirming: {}
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

    case billTypes.BILL_CONFIRMATION_INIT: {
      const { billId } = payload;
      return assocPath(['confirming', billId], true)(state);
    }

    case commonTypes.CONFIRMATION_DONE: {
      if (payload.type !== 'CASH' || payload.type !== 'CARD') return state;
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
