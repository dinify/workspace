// @flow
import * as R from 'ramda';
import { UpdateOriginal } from 'lib/FN';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGGED_FETCHED_DONE': {
      const actualAddons = action.payload.addons;
      return R.assoc('all', UpdateOriginal(state.all, actualAddons))(state);
    }

    case 'CREATE_ADDON_DONE': {
      const newAddon = action.payload.res;
      return R.assocPath(['all', newAddon.id], newAddon)(state);
    }

    case 'REMOVE_ADDON_INIT': {
      const { id } = action.payload;
      const addonObj = state.all[id];
      return R.pipe(
        R.assocPath(['backup', id], addonObj),
        R.dissocPath(['all', id]),
      )(state);
    }

    case 'REMOVE_ADDON_FAIL': {
      const { id } = action.payload.prePayload;
      return R.assocPath(['all', id], state.backup[id])(state);
    }

    default:
      return state;
  }
}
