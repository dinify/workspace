import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { IngredientMap } from 'IngredientModels';
import { fetchMenuItemAsync } from '../menuItem/actions';

export const all = createReducer({} as IngredientMap)

  .handleAction(fetchMenuItemAsync.success, (state, action) => {
    const ingredients = action.payload.entities.ingredients;
    return { ...state.all, ...ingredients };
  });


const ingredientReducer = combineReducers({
  all
});

export default ingredientReducer;
export type IngredientState = ReturnType<typeof ingredientReducer>;
