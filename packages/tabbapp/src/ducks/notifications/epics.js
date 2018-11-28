// @flow
import { Observable } from 'rxjs';
import types from './types';

const showSnackbarEpic = (action$: Observable) =>
  action$
    .ofType(types.DISPATCH_SNACKBAR)
    .map(({ payload }) => ({ type: types.SHOW_SNACKBAR, payload }));

const hideSnackbarEpic = (action$: Observable) =>
  action$
    .ofType(types.SHOW_SNACKBAR)
    .delay(5000)
    .map(({ payload }) => ({ type: types.HIDE_SNACKBAR, payload }));

const rmSnackbarEpic = (action$: Observable) =>
  action$
    .ofType(types.HIDE_SNACKBAR)
    .delay(1000)
    .map(({ payload }) => ({ type: types.RM_SNACKBAR, payload }));

export default [
  showSnackbarEpic,
  hideSnackbarEpic,
  rmSnackbarEpic
];
