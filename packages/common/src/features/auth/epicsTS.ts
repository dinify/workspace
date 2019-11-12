import { of, from } from 'rxjs';
import { mergeMap, map, catchError, filter, tap, mapTo } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { setCookie } from '../../lib/FN';
import { actionTypes } from 'react-redux-firebase';
import { change as changeForm } from 'redux-form';
import { setPage, setLinkProviders } from './actions';
import { openDialog } from '../ui/actions';
import { UNAUTHORIZED } from './types';

const accessTokenEpic: Epic = (action$, state$) =>
  action$.pipe(
    filter(({ type }) => {
      return type.includes('@@reactReduxFirebase');
    }),
    mergeMap(() => {
      const auth = state$.value.firebase.auth;
      if (auth.stsTokenManager && auth.stsTokenManager.accessToken) {
        setCookie('access_token', auth.stsTokenManager.accessToken, 90);
      }
      // else setCookie('access_token', '', 1);
      return of({ type: 'ACCESSTOKEN_HANDLED' });
    })
  );

const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

const refreshTokenEpic: Epic = (action$, state$, { firebase }) =>
  action$.pipe(
    ofType(UNAUTHORIZED),
    mergeMap(({ payload: { type, payload } }) => {
      const auth = firebase.auth();
      if (!auth.currentUser) return of({ type: REFRESH_TOKEN_FAILED, error: true });
      return from(auth.currentUser.getIdToken()).pipe(
        tap((t: any) => setCookie('access_token', t, 90)),
        mapTo({
          type,
          payload,
          refreshTokenTried: true // break the loop
        }),
        catchError(e => of({
          type: REFRESH_TOKEN_FAILED,
          error: true,
          payload: e
        }))
      )
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

const loginErrorHandled = (error?: any) => of(
  { type: 'LOGIN_ERROR_HANDLED', error }
)

const loginLinkHandled = () => of(
  { type: 'LOGIN_LINK_HANDLED' }
)

const loginLinkEpic: Epic = (action$, state$) =>
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


const loginErrorEpic: Epic = (action$, state$, { firebase }) =>
  action$.pipe(
    ofType(actionTypes.LOGIN_ERROR),
    mergeMap(({ authError }) => {
      if (!authError) return loginErrorHandled();
      if (authError.code === 'auth/account-exists-with-different-credential') {
        const promise = firebase.auth().fetchSignInMethodsForEmail(authError.email);
        return from(promise).pipe(
          mergeMap((methods: any) => {
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
                  component: null
                })
              );
            }
            // return loginErrorHandled();
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
  refreshTokenEpic
];
