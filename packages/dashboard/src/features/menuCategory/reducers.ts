import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import { getType } from 'typesafe-actions';
import { fetchMenuCategoriesAsync, createMenuCategoryAsync } from './actions';

const initialState: any = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {

    case getType(fetchMenuCategoriesAsync.success): {
      const categories = payload.entities.menuCategories;
      return assoc('all', {...state.all, ...categories})(state);
    }

    case getType(createMenuCategoryAsync.success): {
      const newCategory = payload;
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

    case firebaseTypes.LOGOUT: {
      return initialState;
    }
    
    default:
      return state;
  }
}
