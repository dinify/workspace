// @flow
import R from 'ramda';
import * as FN from 'lib/FN';
import types from 'ducks/menuCategory/types';

const initialState = {
  all: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MENUCATEGORIES_DONE: {
      const categories = action.payload.res;
      let newState = state;
      categories.forEach(category => {
        if (!category.items) return;
        FN.MapToList(category.items).forEach(item => {
          newState = R.assocPath(['all', item.id], item)(newState);
        });
      });
      return newState;
    }

    default:
      return state;
  }
}
