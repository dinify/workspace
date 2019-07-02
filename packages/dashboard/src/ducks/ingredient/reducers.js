import pipe from 'ramda/src/pipe';
import assoc from 'ramda/src/assoc';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import { UpdateOriginal } from '@dinify/common/dist/lib/FN';
import * as restaurantTypes from 'ducks/restaurant/types';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case restaurantTypes.FETCH_RESTAURANT_DONE: {
      const actualIngredients = payload.res.ingredients;
      return assoc('all', UpdateOriginal(state.all, actualIngredients))(state);
    }
    case 'CREATE_INGREDIENT_DONE': {
      const newIngredient = payload.res;
      return assocPath(['all', newIngredient.id], newIngredient)(state);
    }
    case 'UPDATE_INGREDIENT_INIT': {
      const { id, excludable } = payload;
      return assocPath(['all', id, 'excludable'], excludable)(state);
    }
    case 'REMOVE_INGREDIENT_INIT': {
      const { id } = payload;
      const ingredientObj = state.all[id];
      return pipe(
        assocPath(['backup', id], ingredientObj),
        dissocPath(['all', id]),
      )(state);
    }
    case 'REMOVE_INGREDIENT_FAIL': {
      const { id } = payload.initPayload;
      return assocPath(['all', id], state.backup[id])(state);
    }
    default:
      return state;
  }
}
