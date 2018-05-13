import { combineEpics } from 'redux-observable';
import { epics as restaurant } from './ducks/restaurant';
import { epics as tables } from './ducks/tables';
import { epics as crud } from './ducks/crudEpics';

const epics = [...restaurant, ...tables, ...crud];

export default (deps = {}, platformEpics = []) => (action$, { getState, dispatch }) =>
  combineEpics(...epics, ...platformEpics)(action$, { ...deps, getState, dispatch });
