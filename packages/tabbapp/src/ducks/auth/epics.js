import { Observable } from 'rxjs';
import * as API from 'api/user';
import types from './types';
import { loginFail, loginDone } from './actions';
import { fetchMeInit } from 'ducks/user/actions';
import { setCookie } from 'utils.js';

const loginEpic = (action$: Observable) =>
  action$
    .ofType(types.LOGIN_INIT)
    .switchMap(({ payload: { email, password } }) =>
      Observable.fromPromise(API.Login({ email, password }))
        .mergeMap(res => {
          setCookie('access_token', res.token, 30);
          return Observable.of(loginDone(res), fetchMeInit());
        })
        .catch(error => Observable.of(loginFail(error))),
    );

export default [loginEpic];
