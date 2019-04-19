// @flow
import React from 'react';
import { Observable, of, from } from 'rxjs';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { getFirebase } from 'react-redux-firebase';
import AccountExistsDialog from '../../components/dialogs/AccountExistsDialog';

import * as API from '../../api/user';
// import { checkinInit } from 'ducks/restaurant/actions';
// import { loadUserData } from 'ducks/app/actions';
import { setCookie } from '../../lib/FN';
import { actionTypes } from 'react-redux-firebase';
import { change as changeForm } from 'redux-form';
import { setPage, setLinkProviders } from './actions';
import { openDialog } from '../ui/actions';

const accessTokenEpic = (action$, state$) =>
  action$.pipe(
    filter(action => {
      const triggerOn = [actionTypes.LOGIN, actionTypes.AUTH_EMPTY_CHANGE];
      return triggerOn.includes(action.type);
    }),
    mergeMap(() => {
      const auth = state$.value.firebase.auth;
      if (auth.stsTokenManager && auth.stsTokenManager.accessToken) {
        setCookie('access_token', auth.stsTokenManager.accessToken, 90);
      } else setCookie('access_token', '', 1);
      return of({ type: 'ACCESSTOKEN_HANDLED' });
    })
  );


// return this.loginUser(error.email, params.password).then(result => {
//   console.log('Reauthentication result', result);
//   result.user.linkAndRetrieveDataWithCredential(pendingCred).then((usercred) => {
//     console.log('New credential successfully linked', usercred);
//   }).catch(error => {
//     console.log('Credential linking error', error);
//   });
// });

const loginErrorHandled = (error) => of(
  { type: 'LOGIN_ERROR_HANDLED', error }
)

const loginLinkHandled = () => of(
  { type: 'LOGIN_LINK_HANDLED' }
)

const loginLinkEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.LOGIN),
    mergeMap(({ auth }) => {
      if (state$.value.auth.linkProviders) {
        const cred = state$.value.auth.credential;
        const promise = auth.linkAndRetrieveDataWithCredential(cred);
        return from(promise).pipe(
          map(() => of(
            setLinkProviders({
              linkProviders: false,
              credential: {}
            })
          )),
          catchError(error => loginErrorHandled(error))
        )
      }
      return loginLinkHandled();
    })
  );


const loginErrorEpic = (action$: Observable) =>
  action$.pipe(
    ofType(actionTypes.LOGIN_ERROR),
    mergeMap(({ authError }) => {
      if (!authError) return loginErrorHandled();
      if (authError.code === 'auth/account-exists-with-different-credential') {
        const firebase = getFirebase();
        const promise = firebase.auth().fetchSignInMethodsForEmail(authError.email);
        return from(promise).pipe(
          mergeMap((methods) => {
            if (methods.includes('password')) {
              return of(
                setPage('signIn'),
                changeForm('auth/signin', 'email', authError.email),
                setLinkProviders({
                  linkProviders: true,
                  credential: authError.credential
                })
              );
            }
            else {
              return of(
                setLinkProviders({
                  linkProviders: true,
                  credential: authError.credential
                }),
                openDialog({
                  id: 'account-exists',
                  component: (props) => <AccountExistsDialog
                    providerName={authError.credential.providerId}
                    email={authError.email}
                    methods={methods}
                    {...props}/>
                })
              );
            }
            return loginErrorHandled();
          }),
          catchError(error => loginErrorHandled(error))
        )
      }
      return loginErrorHandled();
    })
  );



export default [
  loginLinkEpic,
  accessTokenEpic,
  loginErrorEpic,
];
