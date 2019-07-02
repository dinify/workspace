import pipe from 'ramda/src/pipe';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import * as restaurantTypes from 'ducks/restaurant/types';

const initialState = {
  all: {},
  backup: {},
  images: [],
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case restaurantTypes.FETCH_RESTAURANT_DONE: {
      const services = payload.res.services;
      return assoc('all', services)(state);
    }

    case 'REMOVE_SERVICE_INIT': {
      const { id } = payload;
      return pipe(
        assocPath(['backup', id], state.all[id]),
        dissocPath(['all', id])
      )(state);
    }

    case 'REMOVE_SERVICE_FAIL': {
      const id = payload.initPayload.id;
      return assocPath(['all', id], state.backup[id])(state);
    }

    case 'FETCH_SERVICEIMAGES_DONE': {
      return assoc('images', payload.res)(state);
    }

    case 'CREATE_SERVICE_DONE': {
      const newService = payload.res;
      return assocPath(['all', newService.id], newService)(state);
    }

    default:
      return state;
  }
}
