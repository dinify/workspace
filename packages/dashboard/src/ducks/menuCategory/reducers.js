import pipe from 'ramda/src/pipe';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import { ListToMap } from '@dinify/common/dist/lib/FN';
import * as restaurantTypes from 'ducks/restaurant/types';
import * as types from './types';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case restaurantTypes.FETCH_LOGGEDRESTAURANT_DONE: {
      const categories = payload.res.categories;
      return assoc('all', categories)(state);
    }

    case types.FETCH_MENUCATEGORIES_DONE: {
      const categories = ListToMap(payload.res);
      return assoc('all', categories)(state);
    }

    case 'CREATE_MENUCATEGORY_DONE': {
      const newCategory = payload.res;
      return assocPath(['all', newCategory.id], newCategory)(state);
    }

    case 'UPDATE_MENUCATEGORY_INIT': {
      const { id } = payload;
      const original = state.all[id];
      return assocPath(['all', id], { ...original, ...payload })(state);
    }

    case 'REMOVE_MENUCATEGORY_INIT': {
      const { id } = payload;
      return pipe(
        assocPath(['backup', id], state.all[id]),
        dissocPath(['all', id])
      )(state);
    }

    case 'REMOVE_MENUCATEGORY_FAIL': {
      const id = payload.initPayload.id;
      return assocPath(['all', id], state.backup[id])(state);
    }

    default:
      return state;
  }
}
