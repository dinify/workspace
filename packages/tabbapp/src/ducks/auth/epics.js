// @flow
import { Observable } from 'rxjs';
import * as API from 'tabb-front/dist/api/user';
import types from './types';
import { loginFail, loginDone, logoutDone, signupFail } from './actions';
import { checkinInit } from 'ducks/restaurant/actions';
import { loadUserData } from 'ducks/app/actions';
import { setCookie } from 'tabb-front/dist/lib/FN';
import moment from 'moment';

const loginInitEpic = (action$: Observable) =>
  action$
    .ofType(types.LOGIN_INIT)
    .switchMap(({ payload: { email, password, qr } }) => {
      return Observable.fromPromise(API.Login({ email, password }))
        .mergeMap(res => {
          setCookie('access_token', res.token, 30);
          // window.history.back();
          return Observable.of(loginDone(res), loadUserData(), checkinInit({ qr }));
        })
        .catch(error => Observable.of(loginFail(error)))
    });

const fbAuthInitEpic = (action$: Observable) =>
  action$
    .ofType(types.FBAUTH_INIT)
    .switchMap(({ payload: { fbRes, qr } }) => {
      const { name, email, accessToken, gender, birthday } = fbRes;
      return Observable.fromPromise(API.LoginWithFacebook({ accessToken }))
        .mergeMap(res => {
          console.log(res, 'LoginWithFacebook');
          if (res.token) setCookie('access_token', res.token, 30);
          window.history.back();
          return Observable.of(loginDone(res), loadUserData(), checkinInit({ qr }));
        })
        .catch(error => {
          console.log(error,'LoginWithFacebookError');

          let formatedGender = 'OTHER';
          if (gender === 'male') formatedGender = 'MALE';
          if (gender === 'female') formatedGender = 'FEMALE';
          let formatedBirthday = null;
          if (birthday) formatedBirthday = moment(birthday, "MM/DD/YYYY").format("YYYY-MM-DD")

          return Observable.fromPromise(API.Register({
              name,
              phone: String(Math.floor(Math.random() * 9283899800) + 22838998),
              email,
              accessToken,
              registrationType: 'FACEBOOK',
              birthday: formatedBirthday,
              gender: formatedGender
            }))
            .mergeMap(res => {
              console.log(res, 'Register');
              if (res.metadata) setCookie('access_token', res.metadata.token, 30);
              window.history.back();
              return Observable.of(loginDone(res), loadUserData(), checkinInit({ qr }));
            })
            .catch(error => {
              console.log(error, 'RegisterError');
              return Observable.of(loginFail(error))
            })
          // return Observable.of(loginFail(error))
        });
    });

const googleAuthInitEpic = (action$: Observable) =>
  action$
    .ofType(types.GOOGLE_AUTH_INIT)
    .switchMap(({ payload: { googleRes, qr } }) => {
      const { profileObj, accessToken } = googleRes;
      console.log(googleRes);
      const { name, email } = profileObj;
      return Observable.fromPromise(API.LoginWithGoogle({ accessToken }))
        .mergeMap(res => {
          console.log(res, 'LoginWithGoogle');
          if (res.token) setCookie('access_token', res.token, 30);
          window.history.back();
          return Observable.of(loginDone(res), loadUserData(), checkinInit({ qr }));
        })
        .catch(error => {
          console.log(error,'LoginWithGoogleError');

          return Observable.fromPromise(API.Register({
              name,
              phone: String(Math.floor(Math.random() * 9283899800) + 22838998),
              email,
              accessToken,
              registrationType: 'GOOGLE',
            }))
            .mergeMap(res => {
              console.log(res, 'Register');
              if (res.metadata) setCookie('access_token', res.metadata.token, 30);
              window.history.back();
              return Observable.of(loginDone(res), loadUserData(), checkinInit({ qr }));
            })
            .catch(error => {
              console.log(error, 'RegisterError');
              return Observable.of(loginFail(error))
            })
          // return Observable.of(loginFail(error))
        });
    });

const signupInitEpic = (action$: Observable) =>
  action$
    .ofType(types.SIGNUP_INIT)
    .switchMap(({ payload: { name, phone, email, password, qr } }) =>
      Observable.fromPromise(API.Register({
          name, phone, email, password, registrationType: 'LOCAL'
        }))
        .mergeMap(res => {
          if (res.metadata) setCookie('access_token', res.metadata.token, 30);
          return Observable.of(loginDone(res), loadUserData(), checkinInit({ qr }));
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
  googleAuthInitEpic,
  signupInitEpic,
  logoutInitEpic,
];
