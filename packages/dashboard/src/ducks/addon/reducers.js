import pipe from 'ramda/src/pipe';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import { ListToMap } from '@dinify/common/dist/lib/FN';
import * as types from './types';

const initialState = {
  all: {},
  backup: {},
  loaded: false
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_RESTAURANTADDONS_DONE: {
      const addons = payload.res;
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
    default:
      return state;
  }
}
