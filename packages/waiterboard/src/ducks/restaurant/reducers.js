import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import pipe from 'ramda/src/pipe';
import { setCookie } from '@dinify/common/dist/lib/FN';
import * as types from './types';

const initialState = {
  all: {},
  selectedWBId: null,
  appRun: false,
  sales: 0,
  timer: {
    o: 200
  },
  selectedRestaurant: null,
  managedRestaurants: []
};

export default function reducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.BOOTSTRAP: {
      return assoc('appRun', true)(state);
    }

    case 'FETCH_RESTAURANT_DONE': {
      const { res } = payload;
      return assocPath(['all', res.id], res)(state);
    }

    case 'GET_SALES_DONE': {
      const { sales } = payload;
      return assoc('sales', sales)(state);
    }

    case 'SET_TIMER': {
      setCookie('timer-'+payload.key, payload.val, 30);
      return assocPath(['timer', payload.key], payload.val)(state);
    }

    case 'SELECT_WAITERBOARD': {
      const { id, restaurantId } = payload;
      return pipe(
        assoc('selectedWBId', id),
        assoc('selectedRestaurant', restaurantId)
      )(state);
    }

    case 'FETCH_MANAGEDRESTAURANTS_DONE': {
      return assoc('managedRestaurants', payload.res)(state);
    }

    default:
      return state;
  }
}
