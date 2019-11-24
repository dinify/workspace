import { combineEpics } from 'redux-observable';
import { epics as crud } from '@dinify/common/src/features/crudEpics';
import authEpics from '@dinify/common/src/features/auth/epics.tsx';
import { reportingEpics as reporting } from '@dinify/common/src/features/reporting';

import restaurantEpics from './features/restaurant/epics';
import menuCategoryEpics from './features/menuCategory/epics.ts';
import menuItemEpics from './features/menuItem/epics';
import addonEpics from './features/addon/epics.ts';
import optionEpics from './features/option/epics.ts';
import ingredientEpics from './features/ingredient/epics.ts';
import serviceEpics from './features/service/epics';
import transactionEpics from './features/transaction/epics.ts';

import translationEpics from './features/translation/epics';

const rootEpic = (action$, state$, firebase, ...rest) => {
  const epic = combineEpics(
    ...authEpics,
    ...restaurantEpics,
    ...menuCategoryEpics,
    ...menuItemEpics,
    ...translationEpics,
    ...addonEpics,
    ...optionEpics,
    ...ingredientEpics,
    ...serviceEpics,
    ...crud,
    ...reporting,
    ...transactionEpics
  );
  const output = epic(
    action$,
    state$,
    {
      firebase,
    },
    ...rest,
  );
  return output;
};

export default rootEpic;
