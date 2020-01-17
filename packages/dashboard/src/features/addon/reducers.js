import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import { ListToMap } from '@dinify/common/src/lib/FN';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import { getType } from 'typesafe-actions';
import { fetchAddonsAsync, createAddonAsync, removeAddonAsync } from './actions';
import { fetchMenuItemAsync } from '../menuItem/actions';

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
        assoc('all', { ...state.all,...ListToMap(addons) }),
        assoc('loaded', true)
      )(state);
    }

    case getType(fetchMenuItemAsync.success): {
      const addons = payload.entities.addons;
      return assoc('all', { ...state.all, ...addons })(state);
    }

    case getType(createAddonAsync.success): {
      const newAddon = payload;
      return assocPath(['all', newAddon.id], newAddon)(state);
    }

    case getType(removeAddonAsync.request): {
      const { id } = payload;
      const addonObj = state.all[id];
      return pipe(
        assocPath(['backup', id], addonObj),
        dissocPath(['all', id]),
      )(state);
    }
    case getType(removeAddonAsync.failure): {
      const { id } = action.initPayload;
      return assocPath(['all', id], state.backup[id])(state);
    }
    
    case firebaseTypes.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
