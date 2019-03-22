// @flow
import * as R from 'ramda';
import types from './types';

const initialState = {
  page: 'default',
  showPassword: false,
  linkProviders: false,
  credential: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PAGE: {
      return R.assoc('page', action.payload)(state);
    }
    case types.SET_SHOWPASSWORD: {
      return R.assoc('showPassword', action.payload)(state);
    }
    case types.SET_LINKPROVIDERS: {
      const { credential, linkProviders } = action.payload;
      const newState = R.assoc('credential', credential)(state);
      return R.assoc('linkProviders', linkProviders)(newState);
    }
    default:
      return state;
  }
}
