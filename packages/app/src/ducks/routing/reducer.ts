import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

type State = any;

/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */

export const locationBeforeTransitions = createReducer<State, any>(null)
  .handleAction(LOCATION_CHANGE, (state, action) => {
    return {...state, ...action.payload };
  });

export const pathnames = createReducer<State, any>([])
  .handleAction(LOCATION_CHANGE, (state, action) => {
    return [...state, action.payload.pathname];
  });

const routerReducer = combineReducers({
  locationBeforeTransitions,
  pathnames
});

export default routerReducer;
export type RouterState = ReturnType<typeof routerReducer>;
