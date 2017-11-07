import { createSelector } from 'reselect';
import { getRestaurant as getState } from './root';

export const appIsRunning = createSelector(getState, ({ appRun }) => !!appRun);
export const getLastError = createSelector(getState, ({ lastError }) => lastError);
