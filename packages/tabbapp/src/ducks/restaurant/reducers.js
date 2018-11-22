// @flow
import R from 'ramda';
import types from './types';
import wsTypes from '../../websockets/types';
import authTypes from 'ducks/auth/types';

const initialState = {
  all: {},
  checkedInRestaurant: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_RESTAURANTS_DONE: {
      let newState = R.assoc('all', {})(state); // reset
      const restaurants = action.payload.res;
      restaurants.forEach(r => {
        newState = R.assocPath(['all', r.id], r)(newState);
      });
      return newState;
    }
    case types.FETCH_RESTAURANT_DONE: {
      const restaurant = action.payload.res;
      return R.assocPath(['all', restaurant.id], restaurant)(state);
    }
    //case types.CHECKIN_DONE: {
    //  const id = action.payload.table.restaurant.id;
    //  return R.assoc('checkedInRestaurant', id)(state);
    //}
    case wsTypes.CHECKOUT_ALL: {
      const s = R.assoc('checkedInRestaurant', null)(state);
      return R.assoc('status', null)(s);
    }
    case types.FETCH_STATUS_DONE: {
      const res = action.payload.res;
      if (!res || !(res instanceof Object)) {
        const s = R.assoc('checkedInRestaurant', null)(state);
        return R.assoc('status', null)(s);
      }
      const id = res.restaurant.id;
      const s = R.assoc('checkedInRestaurant', id)(state);
      return R.assoc('status', res)(s);
    }
    case types.FETCH_STATUS_FAIL: {
      const payload = action.payload;
      if (payload instanceof Array && payload[0].status === 401) {
        return R.assoc('checkedInRestaurant', null)(state);
      }
      return state;
    }
    case authTypes.LOGOUT_DONE: {
      return R.assoc('checkedInRestaurant', null)(state);
    }
    case types.FAV_RESTAURANT_INIT: {
      const { id, fav } = action.payload;
      return R.assocPath(['all', id, 'favorite'], fav)(state);
    }
    case types.FAV_RESTAURANT_DONE: {
      const { id, fav } = action.payload.prePayload;
      return R.assocPath(['all', id, 'favorite'], fav)(state);
    }
    case types.FAV_RESTAURANT_FAIL: {
      const { id, fav } = action.payload.prePayload;
      return R.assocPath(['all', id, 'favorite'], !fav)(state);
    }
    default:
      return state;
  }
}
