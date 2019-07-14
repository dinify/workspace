import assoc from 'ramda/src/assoc';
import { ListToMap } from '@dinify/common/dist/lib/FN';
import * as restaurantTypes from 'ducks/restaurant/types';
import * as types from './types';

const initialState = {
  all: {}
};

export default function reducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case restaurantTypes.FETCH_RESTAURANT_DONE: {
      const { services } = payload.res;
      if (!services) return state;
      return assoc('all', { ...state.all, ...services })(state);
    }
    case types.FETCH_SERVICES_DONE: {
      const { res } = payload;
      if (!res || !(res instanceof Array)) return state;
      const services = ListToMap(res);
      return assoc('all', { ...state.all, ...services })(state);
    }
    default:
      return state;
  }
}
