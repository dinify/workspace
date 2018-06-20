import { combineEpics } from 'redux-observable';
import { epics as crud } from 'ducks/crudEpics';
import { authEpics as auth } from 'ducks/auth';
import appEpics from 'ducks/appEpics';

const epics = [...crud, ...auth, ...appEpics];

export default (deps = {}, platformEpics = []) => (
  action$,
  { getState, dispatch },
) =>
  combineEpics(...epics, ...platformEpics)(action$, {
    ...deps,
    getState,
    dispatch,
  });
