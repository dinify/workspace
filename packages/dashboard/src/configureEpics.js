import { combineEpics } from 'redux-observable';
import { epics as crud } from '@dinify/common/dist/ducks/crudEpics';
import { authEpics as auth } from '@dinify/common/dist/ducks/auth';
import { reportingEpics as reporting } from '@dinify/common/dist/ducks/reporting';

import { restaurantEpics } from './ducks/restaurant';
import { menuItemEpics } from './ducks/menuItem';
import { translationEpics } from './ducks/translation';

const rootEpic = (action$, state$, firebase, ...rest) => {
  const epic = combineEpics(
    ...auth,
    ...restaurantEpics,
    ...menuItemEpics,
    ...translationEpics,
    ...crud,
    ...reporting
  );
  const output = epic(
    action$,
    state$,
    { firebase },
    ...rest
  );
  return output;
};

export default rootEpic;
