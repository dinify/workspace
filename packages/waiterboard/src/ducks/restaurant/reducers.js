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
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_DONE:
      return state;
    case 'SET_WBID':
      return assoc('selectedWBId', action.payload.id)(state);
    case types.BOOTSTRAP:
      return assoc('appRun', true)(state);
    case 'LOGGED_FETCHED_DONE':
      return assoc('loggedUser', action.payload)(state);
    case 'GET_SALES_DONE':
      return assoc('sales', action.payload.sales)(state);
    case 'SET_TIMER': {
      setCookie('timer-'+action.payload.key, action.payload.val, 30);
      return assocPath(['timer', action.payload.key], action.payload.val)(state);
    }
    default:
      return state;
  }
}
