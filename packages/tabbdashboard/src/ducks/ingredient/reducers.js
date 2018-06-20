// @flow
import R from 'ramda';
import { UpdateOriginal } from 'lib/FN';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGGED_FETCHED_DONE': {
      const actualIngredients = action.payload.ingredients;
      return R.assoc('all', UpdateOriginal(state.all, actualIngredients))(
        state,
      );
    }

    case 'CREATE_INGREDIENT_DONE': {
      const newIngredient = action.payload.res;
      return R.assocPath(['all', newIngredient.id], newIngredient)(state);
    }

    case 'UPDATE_INGREDIENT_INIT': {
      const payload = action.payload;
      return R.assocPath(['all', payload.id, 'excludable'], payload.excludable)(
        state,
      );
    }

    case 'REMOVE_INGREDIENT_INIT': {
      const { id } = action.payload;
      const ingredientObj = state.all[id];
      return R.pipe(
        R.assocPath(['backup', id], ingredientObj),
        R.dissocPath(['all', id]),
      )(state);
    }

    case 'REMOVE_INGREDIENT_FAIL': {
      const { id } = action.payload.prePayload;
      return R.assocPath(['all', id], state.backup[id])(state);
    }

    default:
      return state;
  }
}
