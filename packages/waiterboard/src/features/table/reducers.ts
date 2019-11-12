import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import keys from 'ramda/es/keys';
import { getType } from 'typesafe-actions';
import { fetchRestaurantAsync } from '../restaurant/actions';
import { updateTableAsync } from './actions';

const initialState: any = {
  all: {}
};

export default function reducer(state = initialState, action: any) {

  const { payload, type } = action;

  switch (type) {

    case getType(fetchRestaurantAsync.success): {
      const restaurant = payload;
      const waiterboards = restaurant.waiterboards;
      const selectedWBid = keys(waiterboards)[0];
      const wb = waiterboards[selectedWBid];
      return assoc('all', {...state.all, ...wb.tables})(state);
    }

    case getType(updateTableAsync.success): {
      const { id } = payload;
      return assocPath(['all', id], { ...state.all[id], ...payload })(state);
    }

    default:
      return state;
  }

}
