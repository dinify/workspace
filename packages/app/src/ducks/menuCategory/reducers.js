
import * as R from 'ramda';
import types from './types';
import * as FN from '@dinify/common/dist/lib/FN';

const initialState = {
  all: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MENUCATEGORIES_DONE: {
      const { payload: { prePayload, res }} = action;
      const subdomain = prePayload.subdomain || '';
      let newCategories = res || [];
      newCategories = newCategories.map((c) => {
        const plain = R.dissoc('items')(c);
        return R.assoc('subdomain', subdomain)(plain);
      });

      // don't touch categories of other restaurants, redefine all categories of specified restaurant
      const currentList = FN.MapToList(state.all);
      const grouped = R.groupBy((c) => c.subdomain === subdomain ? 'updating': 'otherRestaurants')(currentList);
      const updatedCategories = FN.ListToMap([...newCategories, ...grouped.otherRestaurants]);

      return R.assoc('all', updatedCategories)(state);
    }

    default:
      return state;
  }
}
