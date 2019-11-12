import assoc from 'ramda/es/assoc';
import { getType } from 'typesafe-actions';
import { fetchMenuCategoriesAsync } from './actions.ts';

const initialState = {
  all: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case getType(fetchMenuCategoriesAsync.success): {
      const menuCategories = action.payload.entities.menuCategories;
      return assoc('all', { ...state.all, ...menuCategories })(state);
    }
//    case types.FETCH_MENUCATEGORIES_DONE: {
//      const { payload: { initPayload, res }} = action;
//      const subdomain = initPayload.subdomain || '';
//      let newCategories = res || [];
//      newCategories = newCategories.map((c) => {
//        const plain = dissoc('items')(c);
//        return assoc('subdomain', subdomain)(plain);
//      });
//
//      // don't touch categories of other restaurants, redefine all categories of specified restaurant
//      const currentList = MapToList(state.all);
//      const grouped = groupBy((c) => c.subdomain === subdomain ? 'updating': 'otherRestaurants')(currentList);
//      const other = grouped.otherRestaurants || [];
//      const updatedCategories = ListToMap([...newCategories, ...other]);
//
//      return assoc('all', updatedCategories)(state);
//    }

    default:
      return state;
  }
}
