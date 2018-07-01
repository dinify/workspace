// @flow
import { Observable } from 'rxjs';
import * as API from 'api/user';
import types from './types';
import { loginFail, loginDone, logoutDone } from './actions';
import { loadUserData } from 'ducks/app/actions';
import { setCookie } from 'lib/FN';

const loginInitEpic = (action$: Observable) =>
  action$
    .ofType(types.LOGIN_INIT)
    .switchMap(({ payload: { email, password } }) =>
      Observable.fromPromise(API.Login({ email, password }))
        .mergeMap(res => {
          setCookie('access_token', res.token, 30);
          return Observable.of(loginDone(res), loadUserData());
        })
        .catch(error => Observable.of(loginFail(error))),
    );

const logoutInitEpic = (action$: Observable) =>
  action$
    .ofType(types.LOGOUT_INIT)
    .mergeMap(() => {
      setCookie('access_token', '', 30);
      return Observable.of(logoutDone(), loadUserData());
    });

export default [
  loginInitEpic,
  logoutInitEpic,
];
