import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import * as restaurantTypes from 'ducks/restaurant/types';
import { getType } from 'typesafe-actions';
import { fetchManagedAsync } from './actions';

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

    case getType(fetchManagedAsync.success): {
      return assoc('managedRestaurants', payload)(state);
    }

    default:
      return state;
  }

}
