import { combineEpics } from 'redux-observable';
import { restaurantEpics } from './ducks/restaurant';
import { menuItemEpics } from './ducks/menuItem';

import { epics as crud } from './ducks/crudEpics';

console.log(restaurantEpics);

const epics = [
  ...restaurantEpics,
  ...menuItemEpics,
  ...crud
];

export default (deps = {}, platformEpics = []) => (
  action$,
  { getState, dispatch },
) =>
  combineEpics(...epics, ...platformEpics)(action$, {
    ...deps,
    getState,
    dispatch,
  });
