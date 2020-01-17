import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import { ListToMap } from '@dinify/common/src/lib/FN';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import { getType } from 'typesafe-actions';
import {
  fetchIngredientsAsync,
  createIngredientAsync,
  updateIngredientAsync,
  removeIngredientAsync
} from './actions';
import { fetchMenuItemAsync } from '../menuItem/actions';

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
        assoc('all', { ...state.all, ...ListToMap(ingredients)}),
        assoc('loaded', true)
      )(state);
    }    

    case getType(createIngredientAsync.success): {
      const newIngredient = payload;
      return assocPath(['all', newIngredient.id], newIngredient)(state);
    }

    case getType(fetchMenuItemAsync.success): {
      const ingredients = payload.entities.ingredients;
      return assoc('all', { ...state.all, ...ingredients })(state);
    }


    case getType(updateIngredientAsync.request): {
      const { id, excludable } = payload;
      return assocPath(['all', id, 'excludable'], excludable)(state);
    }

    case getType(removeIngredientAsync.request): {
      const { id } = payload;
      const ingredientObj = state.all[id];
      return pipe(
        assocPath(['backup', id], ingredientObj),
        dissocPath(['all', id]),
      )(state);
    }
    case getType(removeIngredientAsync.failure): {
      const { id } = action.initPayload;
      return assocPath(['all', id], state.backup[id])(state);
    }

    case firebaseTypes.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
