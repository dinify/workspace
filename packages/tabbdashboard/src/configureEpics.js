import { combineEpics } from 'redux-observable';
import { epics as restaurant } from './ducks/restaurant';

const epics = [...restaurant];

export default (deps = {}, platformEpics = []) => (action$, { getState }) =>
  combineEpics(...epics, ...platformEpics)(action$, { ...deps, getState });
