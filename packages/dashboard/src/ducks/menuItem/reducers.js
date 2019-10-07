import pipe from 'ramda/es/pipe';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import { MapToList } from '@dinify/common/dist/lib/FN';
import * as menuCategoryTypes from 'ducks/menuCategory/types';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import * as types from './types';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {    
    case menuCategoryTypes.FETCH_MENUCATEGORIES_DONE: {
      const categories = payload.res;
      let newState = state;
      MapToList(categories).forEach(category => {
        if (!category.items) return;
        MapToList(category.items).forEach(item => {
          item.menu_category_id = category.id;
          if (!state.all[item.id]) newState = assocPath(['all', item.id], item)(newState);
        });
      });
      return newState;
    }

    case 'GET_MENUITEM_DONE': {
      const res = payload;
      if (!res) return state;
      return assocPath(['all', res.id], res)(state);
    }

    case types.CREATE_MENUITEM_DONE: {
      const newItem = payload.res;
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
