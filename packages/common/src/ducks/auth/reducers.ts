import assoc from 'ramda/src/assoc';
import pipe from 'ramda/src/pipe';
import * as types from './types';

const initialState = {
  page: 'default',
  showPassword: false,
  linkProviders: false,
  credential: {}
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.SET_PAGE: {
      return assoc('page', action.payload)(state);
    }
    case types.SET_SHOWPASSWORD: {
      return assoc('showPassword', action.payload)(state);
    }
    case types.SET_LINKPROVIDERS: {
      const { credential, linkProviders } = action.payload;
      return pipe(
        assoc('credential', credential),
        assoc('linkProviders', linkProviders)
      )(state);
    }
    default:
      return state;
  }
}
