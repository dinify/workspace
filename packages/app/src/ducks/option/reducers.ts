import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { OptionMap } from 'OptionModels';
import { fetchMenuItemAsync } from '../menuItem/actions';

export const all = createReducer({} as OptionMap)

  .handleAction(fetchMenuItemAsync.success, (state, action) => {
    const options = action.payload.entities.options;
    return { ...state.all, ...options };
  });

export const choices = createReducer({} as OptionMap)

  .handleAction(fetchMenuItemAsync.success, (state, action) => {
    const choices = action.payload.entities.choices;
    return { ...state.all, ...choices };
  });

const optionReducer = combineReducers({
  all,
  choices
});

export default optionReducer;
export type OptionState = ReturnType<typeof optionReducer>;
