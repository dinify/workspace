import { combineEpics } from 'redux-observable';
import { restaurantEpics } from './ducks/restaurant';
import { menuItemEpics } from './ducks/menuItem';
import { translationEpics } from './ducks/translation';

import { epics as crud } from '@dinify/common/dist/ducks/crudEpics';
import { getFirebase } from 'react-redux-firebase';
import { authEpics as auth } from '@dinify/common/dist/ducks/auth';


const rootEpic = (action$, state$, ...rest) => {
  const epic = combineEpics(
    ...auth,
    ...restaurantEpics,
    ...menuItemEpics,
    ...translationEpics,
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
