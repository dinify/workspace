// @flow
// import { Observable } from 'rxjs';
import types from './types';
// import { logoutInit } from 'ducks/auth/actions';

const meFetchedEpic = (action$: Observable) =>
  action$
    .ofType(types.FETCH_ME_DONE)
    .do(() => {
      window.initSocket();
    })
    .ignoreElements();

export default [
  meFetchedEpic
];
