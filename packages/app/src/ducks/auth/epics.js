// @flow
import { Observable, of, from } from 'rxjs';
import { mergeMap, map, catchError, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import i18next from 'i18next';
import { setCookie, getCookie } from '@dinify/common/dist/lib/FN';
import { actionTypes } from 'react-redux-firebase';
import { change as changeForm } from 'redux-form';
import { setPage, setLinkProviders } from './actions';

const accessTokenEpic = (action$, state$) =>
  action$.pipe(
    filter(action => {
      const triggerOn = [actionTypes.LOGIN, actionTypes.AUTH_EMPTY_CHANGE];
      return triggerOn.includes(action.type);
    }),
    mergeMap(() => {
      const auth = state$.value.firebase.auth;
      let token = null;
      if (auth.stsTokenManager && auth.stsTokenManager.accessToken) {
        token = auth.stsTokenManager.accessToken;
        setCookie('access_token', token, 90);
      } else setCookie('access_token', '', 1);
      return of({ type: 'ACCESSTOKEN_HANDLED', payload: { token } });
    })
  );


const languageHeaderEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.SET_PROFILE),
    mergeMap(() => {
      const profile = state$.value.firebase.profile;
      if (profile.language) {
        let val = '';
        if (profile.language.primary) val += profile.language.primary;
        if (profile.language.other && profile.language.other.length > 0) {
          const len = profile.language.other.length;
          profile.language.other.forEach((lang, i) => {
            // distribute quality value weight and round to two decimal places
            const q = Math.floor(100 * ((len - i) / (len + 1))) / 100;
            val += `,${lang}:q=${q}`; // use colons instead of semicolons for cookie storage
          });
        }
        const curr = getCookie('lang');
        if (curr !== val) {
          setCookie('lang', val, 90);
          return of({ type: 'LANGUAGE_HEADER_UPDATED' });
        }
      }
      return of();
    })
  );

  const languageSettingEpic = (action$, state$) =>
    action$.pipe(
      ofType(actionTypes.SET_PROFILE),
      mergeMap(() => {
        const { language } = state$.value.firebase.profile;
        if (language) {
          const val = JSON.stringify(language);
          const curr = getCookie('language');
          if (curr !== val) {
            setCookie('language', val, 90);

            // TODO: Get i18n instance from context instead of direct import
            i18next.changeLanguage(language.primary);

            return of({ type: 'LANGUAGE_UPDATED' });
          }
        }
        return of();
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
      return loginErrorHandled();
    })
  );


const loginErrorEpic = (action$: Observable, { getFirebase }) =>
  action$.pipe(
    ofType(actionTypes.LOGIN_ERROR),
    mergeMap(({ authError }) => {
      if (!authError) return loginErrorHandled();
      if (authError.code === 'auth/account-exists-with-different-credential') {
        const firebase = getFirebase();
        const promise = firebase.auth().fetchSignInMethodsForEmail(authError.email);
        return from(promise).pipe(
          map((methods) => {
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
  languageHeaderEpic,
  languageSettingEpic,
  loginErrorEpic,
];
