import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import { ListToMap } from '@dinify/common/dist/lib/FN';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import * as types from './types';
import { getType } from 'typesafe-actions';
import { fetchAddonsAsync } from './actions';

const initialState = {
  all: {},
  backup: {},
  loaded: false
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case getType(fetchAddonsAsync.success): {
      const addons = payload;
      return pipe(
        assoc('all', ListToMap(addons)),
        assoc('loaded', true)
      )(state);
    }
    case types.CREATE_ADDON_DONE: {
      const newAddon = payload.res;
      return assocPath(['all', newAddon.id], newAddon)(state);
    }
    case types.REMOVE_ADDON_INIT: {
      const { id } = payload;
      const addonObj = state.all[id];
      return pipe(
        assocPath(['backup', id], addonObj),
        dissocPath(['all', id]),
      )(state);
    }
    case types.REMOVE_ADDON_FAIL: {
      const { id } = payload.initPayload;
      return assocPath(['all', id], state.backup[id])(state);
    }
    case firebaseTypes.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
