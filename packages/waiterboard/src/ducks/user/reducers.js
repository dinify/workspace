import assocPath from 'ramda/src/assocPath';
import * as userTypes from 'ducks/user/types';

const initialState = {
  all: {}
};

export default function reducer(state = initialState, action) {

  const { type, payload } = action;

  switch (type) {

    case userTypes.FETCH_USER_DONE: {
      const user = payload.res;
      return assocPath(['all', user.uid], user)(state);
    }

    default:
      return state;
  }
  
}
