import { combineEpics } from 'redux-observable';

import auth from '@dinify/common/src/features/auth/epicsTS';

import transaction from '../features/transaction/epics';
import cart from '../features/cart/epics';
import language from '../features/language/epics';
import menuCategory from '../features/menuCategory/epics';
import menuItem from '../features/menuItem/epics';
import restaurant from '../features/restaurant/epics';
import seat from '../features/seat/epics';
import service from '../features/service/epics';
import ui from '../features/ui/epics';
import user from '../features/user/epics';

const crud = require('@dinify/common/src/features/crudEpics.js').epics;

export default combineEpics(
  ...crud,
  ...auth,
  ...language,
  ...user,
  ...restaurant,
  ...menuCategory,
  ...menuItem,
  ...cart,
  ...transaction,
  ...seat,
  ...ui,
  ...service
);
