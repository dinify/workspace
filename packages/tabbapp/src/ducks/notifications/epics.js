// @flow
import { Observable } from 'rxjs';
import types from './types';

const rmSnackbarEpic = (action$: Observable) =>
  action$
    .ofType(types.HIDE_SNACKBAR)
    .delay(1000)
    .map(({ payload }) => ({ type: types.RM_SNACKBAR, payload }));

export default [
  rmSnackbarEpic
];
