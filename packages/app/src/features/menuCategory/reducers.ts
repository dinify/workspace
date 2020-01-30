import assoc from 'ramda/es/assoc';
import { getType } from 'typesafe-actions';
import { fetchMenuCategoriesAsync } from './actions';
import { MenuCategoryMap } from 'MenuCategoriesModels';
import { AnyAction } from 'redux';

export interface MenuCategoryState {
  all: MenuCategoryMap
}

const initialState: MenuCategoryState = {
  all: {},
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case getType(fetchMenuCategoriesAsync.success): {
      const menuCategories = action.payload.entities.menuCategories;
      return assoc('all', { ...state.all, ...menuCategories })(state);
    }
    default:
      return state;
  }
}
