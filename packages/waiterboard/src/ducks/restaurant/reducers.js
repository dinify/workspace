import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import * as restaurantTypes from 'ducks/restaurant/types';

const initialState = {
  all: {},
  managedRestaurants: []
};

export default function reducer(state = initialState, action) {

  const { payload, type } = action;

  switch (type) {

    case restaurantTypes.FETCH_RESTAURANT_DONE: {
      const { res } = payload;
      return assocPath(['all', res.id], res)(state);
    }

    case restaurantTypes.FETCH_MANAGEDRESTAURANTS_DONE: {
      const { res } = payload;
      let managedRestaurants = [];
      if (res && res instanceof Array) {
        managedRestaurants = res;
      }
      return assoc('managedRestaurants', managedRestaurants)(state);
    }

    default:
      return state;
  }

}
