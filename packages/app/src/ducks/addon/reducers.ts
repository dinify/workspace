import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { AddonMap } from 'AddonModels';
import { fetchMenuItemAsync } from '../menuItem/actions';
import { fetchCartAsync } from '../cart/actions';

export const all = createReducer({} as AddonMap)


  .handleAction(fetchCartAsync.success, (state, action) => {
    const addons = action.payload.entities.addons;
    return { ...state, ...addons };
  })

  .handleAction(fetchMenuItemAsync.success, (state, action) => {
    const addons = action.payload.entities.addons;
    return { ...state, ...addons };
  });


const addonReducer = combineReducers({
  all
});

export default addonReducer;
export type AddonState = ReturnType<typeof addonReducer>;
