import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import * as authTypes from '@dinify/common/src/ducks/auth/types';
import types from './types';

const initialState = {
  all: {},
  loggedUserId: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ME_FAIL: {
      const payload = action.payload;
      if (payload instanceof Array && payload[0].status === 401) {
        return assoc('loggedUserId', null)(state);
      }
      return state;
    }
    case types.FETCH_USER_DONE: {
      const payload = action.payload.res;
      return assocPath(['all', payload.uid], payload)(state);
    }
    case authTypes.LOGOUT_DONE: {
      if (state.loggedUserId) {
        let newState = state;
        newState = dissocPath(['all', state.loggedUserId])(newState);
        return assoc('loggedUserId', null)(newState);
      }
      return state;
    }
    default:
      return state;
  }
}
