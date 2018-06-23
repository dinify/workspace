// @flow
import R from 'ramda';
import types from './types';
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
    case types.CHECKIN_DONE: {
      const id = action.payload.table.restaurant.id;
      return R.assoc('checkedInRestaurant', id)(state);
    }
    case types.FETCH_STATUS_DONE: {
      const res = action.payload.res;
      if (!res || !(res instanceof Object)) {
        return R.assoc('checkedInRestaurant', null)(state);
      }
      const id = res.table.restaurant.id;
      return R.assoc('checkedInRestaurant', id)(state);
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
    default:
      return state;
  }
}
