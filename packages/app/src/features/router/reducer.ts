import { createReducer, createAction } from 'typesafe-actions';
import { combineReducers } from 'redux';

/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const locationChange = createAction(LOCATION_CHANGE)<any>();

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged, you little shit. :P
 */

export const locationBeforeTransitions = createReducer({})
  .handleAction(locationChange, (state, action) => {
    return {...state, ...action.payload };
  });

export const pathnames = createReducer([] as any[])
  .handleAction(locationChange, (state, action) => {
    return [...state, action.payload.pathname];
  });

const routerReducer = combineReducers({
  locationBeforeTransitions,
  pathnames
});

export default routerReducer;
export type RouterState = ReturnType<typeof routerReducer>;
