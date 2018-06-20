import R from 'ramda';
import types from './types';

const initialState = {
  all: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_RESTAURANTS_DONE: {
      let newState = state;
      const restaurants = action.payload.res;
      restaurants.forEach(r => {
        newState = R.assocPath(['all', r.id], r)(newState);
      });
      return newState;
    }
    default:
      return state;
  }
}
