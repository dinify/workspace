import { createSelector } from 'reselect';

export const getState = (state) => state.app;

export const appIsRunning = createSelector(getState, ({ appRun }) => !!appRun);
