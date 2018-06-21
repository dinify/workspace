// @flow
import { Observable } from 'rxjs';
import * as API from 'api/user';
import types from './types';
import { loginFail, loginDone, logoutDone } from './actions';
import { fetchMeInit } from 'ducks/user/actions';
import { fetchStatusInit } from 'ducks/restaurant/actions';
import { setCookie } from 'utils.js';

const loginInitEpic = (action$: Observable) =>
  action$
    .ofType(types.LOGIN_INIT)
    .switchMap(({ payload: { email, password } }) =>
      Observable.fromPromise(API.Login({ email, password }))
        .mergeMap(res => {
          setCookie('access_token', res.token, 30);
          return Observable.of(loginDone(res), fetchMeInit(), fetchStatusInit());
        })
        .catch(error => Observable.of(loginFail(error))),
    );

const logoutInitEpic = (action$: Observable) =>
  action$
    .ofType(types.LOGOUT_INIT)
    .map(() => {
      setCookie('access_token', '', 30);
      return logoutDone();
    });

export default [
  loginInitEpic,
  logoutInitEpic,
];
