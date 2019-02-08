import { combineEpics } from 'redux-observable';
import { restaurantEpics } from './ducks/restaurant';
import { menuItemEpics } from './ducks/menuItem';

import { epics as crud } from './ducks/crudEpics';
import { getFirebase } from 'react-redux-firebase';
import { authEpics as auth } from '@dinify/common/dist/ducks/auth';


const rootEpic = (action$, state$, ...rest) => {
  const epic = combineEpics(
    ...auth,
    ...restaurantEpics,
    ...menuItemEpics,
    ...crud
  );
  const output = epic(
    action$,
    state$,
    { getFirebase },
    ...rest
  );
  return output;
};

export default rootEpic;
