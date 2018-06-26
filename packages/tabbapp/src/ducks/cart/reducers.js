// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  dishes: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_DISH: {
      const { dishId } = action.payload;
      return R.assoc('dishes', [...state.dishes, dishId])(state);
    }

    default:
      return state;
  }
}
