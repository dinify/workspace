import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { OptionMap } from 'OptionModels';
import { fetchMenuItemAsync } from '../menuItem/actions';
import { fetchCartAsync } from '../cart/actions';

export const all = createReducer({} as OptionMap)

  .handleAction(fetchMenuItemAsync.success, (state, action) => {
    const options = action.payload.entities.options;
    return { ...state, ...options };
  });

export const choices = createReducer({} as OptionMap)

  .handleAction(fetchCartAsync.success, (state, action) => {
    const choices = action.payload.entities.choices;
    return { ...state, ...choices };
  })

  .handleAction(fetchMenuItemAsync.success, (state, action) => {
    const choices = action.payload.entities.choices;
    return { ...state, ...choices };
  });

const optionReducer = combineReducers({
  all,
  choices
});

export default optionReducer;
export type OptionState = ReturnType<typeof optionReducer>;
