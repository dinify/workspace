import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import keys from 'ramda/src/keys';
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
      const selectedWBid = keys(waiterboards)[0];
      const wb = waiterboards[selectedWBid];
      return assoc('all', UpdateOriginal(state.all, wb.tables))(state);
    }

    case 'UPDATE_TABLE_INIT': {
      const { id } = payload;
      return assocPath(['all', id], { ...state.all[id], ...payload })(state);
    }

    default:
      return state;
  }
}
