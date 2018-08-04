// @flow
import { Observable } from 'rxjs';
import * as API from 'api/user';
import types from './types';
import { loginFail, loginDone, logoutDone, signupFail } from './actions';
import { loadUserData } from 'ducks/app/actions';
import { setCookie } from 'lib/FN';

const loginInitEpic = (action$: Observable) =>
  action$
    .ofType(types.LOGIN_INIT)
    .switchMap(({ payload: { email, password } }) =>
      Observable.fromPromise(API.Login({ email, password }))
        .mergeMap(res => {
          setCookie('access_token', res.token, 30);
          window.history.back();
          return Observable.of(loginDone(res), loadUserData());
        })
        .catch(error => Observable.of(loginFail(error))),
    );

const fbAuthInitEpic = (action$: Observable) =>
  action$
    .ofType(types.FBAUTH_INIT)
    .switchMap(({ payload: { name, email, accessToken } }) =>

    Observable.fromPromise(API.LoginWithFacebook({
        accessToken
      }))
      .mergeMap(res => {
        console.log(res, 'LoginWithFacebook');
        if (res.metadata) setCookie('access_token', res.metadata.token, 30);
        return Observable.of(loginDone(res), loadUserData());
      })
      .catch(error => {
        console.log(error,'LoginWithFacebookError');


        return Observable.fromPromise(API.Register({
            name, phone: '928389988', email, accessToken, registrationType: 'FACEBOOK'
          }))
          .mergeMap(res => {
            console.log(res, 'Register');
            if (res.metadata) setCookie('access_token', res.metadata.token, 30);
            return Observable.of(loginDone(res), loadUserData());
          })
          .catch(error => {
            console.log(error, 'RegisterError');
            return Observable.of(loginFail(error))
          })


        //return Observable.of(loginFail(error))
      })


    );

const signupInitEpic = (action$: Observable) =>
  action$
    .ofType(types.SIGNUP_INIT)
    .switchMap(({ payload: { name, phone, email, password } }) =>
      Observable.fromPromise(API.Register({
          name, phone, email, password, registrationType: 'LOCAL'
        }))
        .mergeMap(res => {
          if (res.metadata) setCookie('access_token', res.metadata.token, 30);
          return Observable.of(loginDone(res), loadUserData());
        })
        .catch(error => Observable.of(signupFail(error))),
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
  fbAuthInitEpic,
  signupInitEpic,
  logoutInitEpic,
];
