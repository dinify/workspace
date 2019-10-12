import { combineEpics } from 'redux-observable';
import { epics as crud } from '@dinify/common/dist/ducks/crudEpics';
import { authEpics as auth } from '@dinify/common/dist/ducks/auth';
import { reportingEpics as reporting } from '@dinify/common/dist/ducks/reporting';

import { restaurantEpics } from './ducks/restaurant';
import menuCategoryEpics from './ducks/menuCategory/epics.ts';
import menuItemEpics from './ducks/menuItem/epics';
import { addonEpics } from './ducks/addon';
import { optionEpics } from './ducks/option';
import ingredientEpics from './ducks/ingredient/epics.ts';
import serviceEpics from './ducks/service/epics';

import { translationEpics } from './ducks/translation';

const rootEpic = (action$, state$, firebase, ...rest) => {
  const epic = combineEpics(
    ...auth,
    ...restaurantEpics,
    ...menuCategoryEpics,
    ...menuItemEpics,
    ...translationEpics,
    ...addonEpics,
    ...optionEpics,
    ...ingredientEpics,
    ...serviceEpics,
    ...crud,
    ...reporting
  );
  const output = epic(
    action$,
    state$,
    {
      firebase,
      i18nInstance: window.i18nInstance
    },
    ...rest
  );
  return output;
};

export default rootEpic;
