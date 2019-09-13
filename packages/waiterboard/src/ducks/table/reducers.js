import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import keys from 'ramda/es/keys';
import { UpdateOriginal } from '@dinify/common/dist/lib/FN';
import * as restaurantTypes from 'ducks/restaurant/types';
import * as tableTypes from 'ducks/table/types';

const initialState = {
  all: {}
};

export default function reducer(state = initialState, action) {

  const { payload, type } = action;

  switch (type) {

    case restaurantTypes.FETCH_RESTAURANT_DONE: {
      const restaurant = payload.res;
      const waiterboards = restaurant.waiterboards;
      const selectedWBid = keys(waiterboards)[0];
      const wb = waiterboards[selectedWBid];
      return assoc('all', UpdateOriginal(state.all, wb.tables))(state);
    }

    case tableTypes.UPDATE_TABLE_INIT: {
      const { id } = payload;
      return assocPath(['all', id], { ...state.all[id], ...payload })(state);
    }

    default:
      return state;
  }

}
