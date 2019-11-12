import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import { getType } from 'typesafe-actions';
import { fetchManagedAsync, fetchRestaurantAsync } from './actions';

const initialState = {
  all: {},
  managedRestaurants: []
};

export default function reducer(state = initialState, action: any) {

  const { payload, type } = action;

  switch (type) {

    case getType(fetchRestaurantAsync.success): {
      const res = payload;
      return assocPath(['all', res.id], res)(state);
    }

    case getType(fetchManagedAsync.success): {
      return assoc('managedRestaurants', payload)(state);
    }

    default:
      return state;
  }

}
