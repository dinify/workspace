import { combineEpics } from 'redux-observable';
import { epics as restaurant } from './ducks/restaurant';

const epics = [...restaurant];

export default (deps = {}, platformEpics = []) => (action$, { getState, dispatch }) =>
  combineEpics(...epics, ...platformEpics)(action$, { ...deps, getState, dispatch });
