import assocPath from 'ramda/es/assocPath';
import { getType } from 'typesafe-actions';
import { fetchUserAsync } from './actions';

const initialState = {
  all: {}
};

export default function reducer(state = initialState, action: any) {

  const { type, payload } = action;

  switch (type) {

    case getType(fetchUserAsync.success): {
      const user = payload.user;
      return assocPath(['all', user.uid], user)(state);
    }

    default:
      return state;
  }
  
}
