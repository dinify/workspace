import { combineEpics } from 'redux-observable';
import { epics as restaurant } from './ducks/restaurant';
import { epics as crud } from './ducks/crud';


const epics = [...restaurant, ...crud];

export default (deps = {}, platformEpics = []) => (action$, { getState, dispatch }) =>
  combineEpics(...epics, ...platformEpics)(action$, { ...deps, getState, dispatch });
