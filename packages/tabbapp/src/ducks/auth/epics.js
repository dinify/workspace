// @flow
import { Observable } from 'rxjs';
import * as API from 'tabb-front/dist/api/user';
import { checkinInit } from 'ducks/restaurant/actions';
import { loadUserData } from 'ducks/app/actions';
import { setCookie } from 'tabb-front/dist/lib/FN';
import { actionTypes } from 'react-redux-firebase'


const loginErrorEpic = (action$: Observable, { getFirebase }) =>
  action$
    .ofType(actionTypes.LOGIN_ERROR)
    .mergeMap(({ authError }) => {
      if (!authError) return Observable.of({ type: 'LOGIN_ERROR_HANDLED' });
      if (authError.code === 'auth/account-exists-with-different-credential') {



        getFirebase().auth().fetchSignInMethodsForEmail(authError.email).then((methods) => {
          console.log('Attempting providers', methods);

          // TODO
          // if (method === 'password') {
          // signInWithEmailAndPassword
          //   return this.loginUser(error.email, params.password).then(result => {
          //     console.log('Reauthentication result', result);
          //     result.user.linkAndRetrieveDataWithCredential(pendingCred).then((usercred) => {
          //       console.log('New credential successfully linked', usercred);
          //     }).catch(error => {
          //       console.log('Credential linking error', error);
          //     });
          //   });
          // }
          // console.log('Reattempting login with social', method);
          //
          // return firebase.auth().signInWithPopup(this.getProvider(method)).then(result => {
          //   console.log('Reauthentication result', result);
          //   result.user.linkAndRetrieveDataWithCredential(pendingCred).then((usercred) => {
          //     console.log('New credential successfully linked', usercred);
          //   }).catch(error => {
          //     console.log('Credential linking error', error);
          //   });
          // }).catch(error => {
          //   console.log('Reauthentication error', error);
          // });


        });



        console.log(authError);
      }
      return Observable.of({ type: 'LOGIN_ERROR_HANDLED' });
    });





export default [
  loginErrorEpic,
];
