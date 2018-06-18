// @flow
import R from 'ramda';
import * as FN from 'lib/FN';

const initialState = {
  all: {},
  backup: {},
  images: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGGED_FETCHED_DONE': {
      const services = action.payload.services;
      return R.assoc('all', services)(state);
    }

    case 'REMOVE_SERVICE_INIT': {
      state = R.assocPath(
        ['backup', action.payload.id],
        state.all[action.payload.id],
      )(state);
      return R.dissocPath(['all', action.payload.id])(state);
    }

    case 'REMOVE_SERVICE_FAIL': {
      const id = action.payload.prePayload.id;
      return R.assocPath(['all', id], state.backup[id])(state);
    }

    case 'FETCH_SERVICEIMAGES_DONE': {
      return R.assoc('images', action.payload.res)(state);
    }

    case 'CREATE_SERVICE_DONE': {
      const newService = action.payload.res;
      return R.assocPath(['all', newService.id], newService)(state);
    }

    default:
      return state;
  }
}