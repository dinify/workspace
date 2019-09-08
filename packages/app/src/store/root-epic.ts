import { combineEpics } from 'redux-observable';

import auth from '@dinify/common/src/ducks/auth/epics';

import app from '../ducks/app/epics';
import transaction from '../ducks/transaction/epics';
import cart from '../ducks/cart/epics';
import language from '../ducks/language/epics';
import menuCategory from '../ducks/menuCategory/epics';
import menuItem from '../ducks/menuItem/epics';
import restaurant from '../ducks/restaurant/epics';
import seat from '../ducks/seat/epics';
import service from '../ducks/service/epics';
import ui from '../ducks/ui/epics';
import user from '../ducks/user/epics';

const crud = require('@dinify/common/src/ducks/crudEpics.js').epics;

export default combineEpics(
  ...app,
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
