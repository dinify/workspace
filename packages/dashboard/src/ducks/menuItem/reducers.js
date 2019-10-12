import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import * as menuCategoryTypes from 'ducks/menuCategory/types';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import { getType } from 'typesafe-actions';
import { fetchMenuCategoriesAsync } from '../menuCategory/actions';
import * as types from './types';
import { fetchMenuItemAsync, createMenuItemAsync } from './actions';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {    
    case getType(fetchMenuCategoriesAsync.success): {
      const items = payload.entities.menuItems;
      return assoc('all', {...state.all, ...items})(state);
    }

    case getType(fetchMenuItemAsync.success): {
      const res = payload;
      if (!res) return state;
      return assocPath(['all', res.id], res)(state);
    }

    case getType(createMenuItemAsync.success): {
      const newItem = payload;
      return assocPath(['all', newItem.id], newItem)(state);
    }

    case types.UPDATE_MENUITEM_INIT: {
      const { id } = payload;
      const original = state.all[id];

      return assocPath(['all', id], { ...original, ...payload })(state);
    }

    case types.REMOVE_MENUITEM_INIT: {
      const { id } = payload;
      return pipe(
        assocPath(['backup', id], state.all[id]),
        dissocPath(['all', id])
      )(state);
    }

    case type.REMOVE_MENUITEM_FAIL: {
      const id = payload.initPayload.id;
      return assocPath(['all', id], state.backup[id])(state);
    }

    case types.UPDATE_ITEMIMAGE_DONE: {
      const foodId = payload.initPayload.id;
      const image = payload.res;
      return assocPath(['all', foodId, 'images', image.id], image)(state);
    }
    case firebaseTypes.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
