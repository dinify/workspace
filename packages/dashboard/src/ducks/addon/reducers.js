import pipe from 'ramda/src/pipe';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import { UpdateOriginal } from '@dinify/common/dist/lib/FN';
import * as restaurantTypes from 'ducks/restaurant/types';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case restaurantTypes.FETCH_LOGGEDRESTAURANT_DONE: {
      const actualAddons = payload.res.addons;
      return assoc('all', UpdateOriginal(state.all, actualAddons))(state);
    }
    case 'CREATE_ADDON_DONE': {
      const newAddon = payload.res;
      return assocPath(['all', newAddon.id], newAddon)(state);
    }
    case 'REMOVE_ADDON_INIT': {
      const { id } = payload;
      const addonObj = state.all[id];
      return pipe(
        assocPath(['backup', id], addonObj),
        dissocPath(['all', id]),
      )(state);
    }
    case 'REMOVE_ADDON_FAIL': {
      const { id } = payload.prePayload;
      return assocPath(['all', id], state.backup[id])(state);
    }
    default:
      return state;
  }
}
