import { combineEpics } from 'redux-observable';
import { epics as viewer } from './ducks/viewer';
import { epics as restaurant } from './ducks/restaurant';

const epics = [...viewer, ...restaurant];

export default (deps = {}, platformEpics = []) => (action$, { getState }) =>
  combineEpics(...epics, ...platformEpics)(action$, { ...deps, getState });
