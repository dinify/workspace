import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import { ListToMap } from '@dinify/common/dist/lib/FN';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import * as types from './types';
import { getType } from 'typesafe-actions';
import { fetchIngredientsAsync } from './actions';

const initialState = {
  all: {},
  backup: {},
  loaded: false
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {

    case getType(fetchIngredientsAsync.success): {
      const ingredients = payload;
      return pipe(
        assoc('all', ListToMap(ingredients)),
        assoc('loaded', true)
      )(state);
    }    

    case types.CREATE_INGREDIENT_DONE: {
      const newIngredient = payload.res;
      return assocPath(['all', newIngredient.id], newIngredient)(state);
    }


    case types.UPDATE_INGREDIENT_INIT: {
      const { id, excludable } = payload;
      return assocPath(['all', id, 'excludable'], excludable)(state);
    }

    case types.REMOVE_INGREDIENT_INIT: {
      const { id } = payload;
      const ingredientObj = state.all[id];
      return pipe(
        assocPath(['backup', id], ingredientObj),
        dissocPath(['all', id]),
      )(state);
    }
    case types.REMOVE_INGREDIENT_FAIL: {
      const { id } = payload.initPayload;
      return assocPath(['all', id], state.backup[id])(state);
    }

    case firebaseTypes.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
