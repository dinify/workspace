import { combineEpics } from 'redux-observable';
import { epics as restaurant } from './ducks/restaurant';
import { epics as tables } from './ducks/tables';

const epics = [...restaurant, ...tables];

export default (deps = {}, platformEpics = []) => (action$, { getState, dispatch }) =>
  combineEpics(...epics, ...platformEpics)(action$, { ...deps, getState, dispatch });
