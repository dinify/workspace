// @flow
import R from 'ramda';
import types from './types';
import authTypes from 'ducks/auth/types'

const initialState = {
  all: {},
  loggedUserId: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ME_DONE: {
      const user = action.payload.res;
      return R.assoc('loggedUserId', user.id)(
        R.assocPath(['all', user.id], user)(state),
      );
    }
    case types.FETCH_ME_FAIL: {
      const payload = action.payload;
      if (payload instanceof Array && payload[0].status === 401) {
        return R.assoc('loggedUserId', null)(state);
      }
      return state;
    }
    case types.FETCH_USER_DONE: {
      const payload = action.payload.res;
      return R.assocPath(['all', payload.id], payload)(state);
    }
    case authTypes.LOGOUT_DONE: {
      if (state.loggedUserId) {
        let newState = state;
        newState = R.dissocPath(['all', state.loggedUserId])(newState);
        return R.assoc('loggedUserId', null)(newState);
      }
      return state;
    }
    default:
      return state;
  }
}
