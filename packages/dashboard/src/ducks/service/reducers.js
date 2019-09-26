import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import { ListToMap } from '@dinify/common/dist/lib/FN';

const initialState = {
  all: {},
  backup: {},
  images: [],
};

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action;

  switch (type) {
    case 'GET_SERVICES_DONE': {
      const services = ListToMap(payload);
      return assoc('all', { ...state.all, ...services })(state);
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

    case 'POST_SERVICE_INIT': {
      const tempService = payload;
      return assocPath(['all', tempService.id], tempService)(state);
    }

    case 'POST_SERVICE_DONE': {
      const tempId = meta.id;
      const actualId = payload.id;
      const actualService = {
        ...state.all[tempId],
        id: actualId
      }
      return pipe(
        dissocPath(['all', tempId]),
        assocPath(['all', actualId], actualService)
      )(state);
    }

    case firebaseTypes.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
