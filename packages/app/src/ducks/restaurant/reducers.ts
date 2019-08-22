import { Restaurant } from 'RestaurantModels';

import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import { 
  fetchStatusAsync, favRestaurantAsync, fetchRestaurantAsync, fetchRestaurantsAsync
} from './actions';
import wsTypes from '../../websockets/types';
import { getType } from 'typesafe-actions';

const authTypes = require('@dinify/common/dist/ducks/auth/types');

const { ListToMap } = require('@dinify/common/dist/lib/FN');


const initialState = {
  all: {},
  checkedInRestaurant: null,
};

export default function reducer(state = initialState, action: any) {

  switch (action.type) {

    case getType(fetchRestaurantsAsync.success): {
      const restaurants: Restaurant[] = action.payload.res;
      return assoc('all', ListToMap(restaurants))(state);
    }

    case getType(fetchRestaurantAsync.success): {
      const restaurant: Restaurant = action.payload.res;
      return assocPath(['all', restaurant.id], restaurant)(state);
    }
    // case types.CHECKIN_DONE: {
    //  const id = action.payload.table.restaurant.id;
    //  return assoc('checkedInRestaurant', id)(state);
    // }

    case wsTypes.CHECKOUT_ALL: {
      const s = assoc('checkedInRestaurant', null)(state);
      return assoc('status', null)(s);
    }

    case getType(fetchStatusAsync.success): {
      const res = action.payload.res;
      if (!res || !(res instanceof Object)) {
        const s = assoc('checkedInRestaurant', null)(state);
        return assoc('status', null)(s);
      }
      const id = res.restaurant.id;
      const s = assoc('checkedInRestaurant', id)(state);
      return assoc('status', res)(s);
    }

    case getType(fetchStatusAsync.failure): {
      const payload = action.payload;
      if (payload instanceof Array && payload[0].status === 401) {
        return assoc('checkedInRestaurant', null)(state);
      }
      return state;
    }

    case authTypes.LOGOUT_DONE: {
      return assoc('checkedInRestaurant', null)(state);
    }

    case getType(favRestaurantAsync.request): {
      const { id, fav } = action.payload;
      return assocPath(['all', id, 'favorite'], fav)(state);
    }

    case getType(favRestaurantAsync.success): {
      const { id, fav } = action.payload.initPayload;
      return assocPath(['all', id, 'favorite'], fav)(state);
    }

    case getType(favRestaurantAsync.failure): {
      const { id, fav } = action.initPayload;
      return assocPath(['all', id, 'favorite'], !fav)(state);
    }

    default:
      return state;

  }

}
