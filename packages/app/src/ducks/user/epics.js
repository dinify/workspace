// @flow
import { Observable } from 'rxjs';
import { ignoreElements, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from './types';
// import { logoutInit } from 'ducks/auth/actions';

const meFetchedEpic = (action$: Observable) =>
  action$.pipe(
    ofType('ACCESSTOKEN_HANDLED'),
    tap(() => {
      window.initSocket();
    }),
    ignoreElements()
  );

export default [
  meFetchedEpic
];
