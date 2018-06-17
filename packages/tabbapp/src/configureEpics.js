import { combineEpics } from 'redux-observable';
import { epics as crud } from './ducks/crudEpics';

const epics = [...crud];

export default (deps = {}, platformEpics = []) => (action$, { getState, dispatch }) =>
  combineEpics(...epics, ...platformEpics)(action$, { ...deps, getState, dispatch });
