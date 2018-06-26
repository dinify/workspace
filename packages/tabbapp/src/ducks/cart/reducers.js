// @flow
import R from 'ramda';
import types from './types';

const initialState = {
  items: [{
    name: "Cabbage kimchi",
    price: "12.000 KD"
  },
  {
    name: "Kimbap",
    price: "6.000 KD"
  },
  {
    name: "Sprite",
    price: "1.000 KD"
  }
]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_ITEM: {
      const { dishId } = action.payload;
      return R.assoc('items', [...state.items, dishId])(state);
    }

    default:
      return state;
  }
}
