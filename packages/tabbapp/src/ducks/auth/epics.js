// @flow
import { Observable } from 'rxjs';
import * as API from 'tabb-front/dist/api/user';
import { checkinInit } from 'ducks/restaurant/actions';
import { loadUserData } from 'ducks/app/actions';
import { setCookie } from 'tabb-front/dist/lib/FN';
import { actionTypes } from 'react-redux-firebase';
import { change as changeForm } from 'redux-form';
import { setPage, setLinkProviders } from './actions';

const accessTokenEpic = (action$: Observable, { getState }) =>
  action$
    .filter(action => {
      const triggerOn = [actionTypes.LOGIN, actionTypes.AUTH_EMPTY_CHANGE];
      return triggerOn.includes(action.type);
    })
    .mergeMap(() => {
      const auth = getState().firebase.auth;
      if (auth.stsTokenManager && auth.stsTokenManager.accessToken) {
        setCookie('access_token', auth.stsTokenManager.accessToken, 90);
      } else setCookie('access_token', '', 1);
      return Observable.of({ type: 'ACCESSTOKEN_HANDLED' });
    });


// return this.loginUser(error.email, params.password).then(result => {
//   console.log('Reauthentication result', result);
//   result.user.linkAndRetrieveDataWithCredential(pendingCred).then((usercred) => {
//     console.log('New credential successfully linked', usercred);
//   }).catch(error => {
//     console.log('Credential linking error', error);
//   });
// });

const loginErrorHandled = (error) => Observable.of(
  { type: 'LOGIN_ERROR_HANDLED', error }
)

const loginLinkEpic = (action$: Observable, { getState }) =>
  action$
    .ofType(actionTypes.LOGIN)
    .mergeMap(({ auth }) => {
      const state = getState();
      if (state.auth.linkProviders) {
        const cred = state.auth.credential;
        const promise = auth.linkAndRetrieveDataWithCredential(cred);
        return Observable.fromPromise(promise)
          .mergeMap(() => {
            return Observable.of(
              setLinkProviders({
                linkProviders: false,
                credential: {}
              })
            );
          })
          .catch(error => loginErrorHandled(error))
      }
      return loginErrorHandled();
    });


const loginErrorEpic = (action$: Observable, { getFirebase }) =>
  action$
    .ofType(actionTypes.LOGIN_ERROR)
    .mergeMap(({ authError }) => {
      if (!authError) return loginErrorHandled();
      if (authError.code === 'auth/account-exists-with-different-credential') {
        const firebase = getFirebase();
        const promise = firebase.auth().fetchSignInMethodsForEmail(authError.email);
        return Observable.fromPromise(promise)
          .mergeMap(methods => {
            if (methods.includes('password')) {
              return Observable.of(
                setPage('signIn'),
                changeForm('auth/signin', 'email', authError.email),
                setLinkProviders({
                  linkProviders: true,
                  credential: authError.credential
                })
              );
            }
            return loginErrorHandled();
          })
          .catch(error => loginErrorHandled(error))
      }
      return loginErrorHandled();
    });


export default [
  loginLinkEpic,
  accessTokenEpic,
  loginErrorEpic,
];
