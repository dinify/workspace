import * as R from 'ramda';
import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import { setCookie } from '@dinify/common/dist/lib/FN';
import types from './types';

const initialState = {
  selectedWBId: null,
  appRun: false,
  loggedUser: {},
  sales: 0,
  timer: {
    o: 200
  },
  selectedRestaurant: null,
  managedRestaurants: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_DONE:
      return state;
    case types.BOOTSTRAP:
      return assoc('appRun', true)(state);
    case 'FETCH_LOGGEDRESTAURANT_DONE':
      return assoc('loggedUser', action.payload.res)(state);
    case 'GET_SALES_DONE':
      return assoc('sales', action.payload.sales)(state);
    case 'SET_TIMER': {
      setCookie('timer-'+action.payload.key, action.payload.val, 30);
      return assocPath(['timer', action.payload.key], action.payload.val)(state);
    }
    case 'SELECT_WAITERBOARD': {
      const { id, restaurantId } = action.payload;
      const newState = R.assoc('selectedWBId', id)(state);
      return R.assoc('selectedRestaurant', restaurantId)(newState);
    }
    case 'FETCH_MANAGEDRESTAURANTS_DONE':
      return R.assoc('managedRestaurants', action.payload.res)(state);
    default:
      return state;
  }
}
