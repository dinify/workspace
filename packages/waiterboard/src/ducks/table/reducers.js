import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import keys from 'ramda/src/keys';
import merge from 'ramda/src/merge';
import { UpdateOriginal } from '@dinify/common/dist/lib/FN';

const initialState = {
  all: {}
};

export default function reducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {

    case 'FETCH_RESTAURANT_DONE': {
      const restaurant = payload.res;
      const waiterboards = restaurant.waiterboards;
      const selectedWBid = keys(waiterboards)[0]
      const wb = waiterboards[selectedWBid]
      return assoc('all', UpdateOriginal(state.all, wb.tables))(state)
    }

    case 'UPDATE_TABLE_INIT': {
      const id = payload.id;
      const newTable = merge(state.all[id], payload)
      return assocPath(['all', id], newTable)(state)
    }

    default:
      return state;
  }
}
