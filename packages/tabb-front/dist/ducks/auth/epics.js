"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rxjs = require("rxjs");

var API = _interopRequireWildcard(require("tabb-front/dist/api/user"));

var _actions = require("ducks/restaurant/actions");

var _actions2 = require("ducks/app/actions");

var _FN = require("tabb-front/dist/lib/FN");

var _reactReduxFirebase = require("react-redux-firebase");

var _reduxForm = require("redux-form");

var _actions3 = require("./actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var accessTokenEpic = function accessTokenEpic(action$, _ref) {
  var getState = _ref.getState;
  return action$.filter(function (action) {
    var triggerOn = [_reactReduxFirebase.actionTypes.LOGIN, _reactReduxFirebase.actionTypes.AUTH_EMPTY_CHANGE];
    return triggerOn.includes(action.type);
  }).mergeMap(function () {
    var auth = getState().firebase.auth;

    if (auth.stsTokenManager && auth.stsTokenManager.accessToken) {
      (0, _FN.setCookie)('access_token', auth.stsTokenManager.accessToken, 90);
    } else (0, _FN.setCookie)('access_token', '', 1);

    return _rxjs.Observable.of({
      type: 'ACCESSTOKEN_HANDLED'
    });
  });
}; // return this.loginUser(error.email, params.password).then(result => {
//   console.log('Reauthentication result', result);
//   result.user.linkAndRetrieveDataWithCredential(pendingCred).then((usercred) => {
//     console.log('New credential successfully linked', usercred);
//   }).catch(error => {
//     console.log('Credential linking error', error);
//   });
// });


var loginErrorHandled = function loginErrorHandled(error) {
  return _rxjs.Observable.of({
    type: 'LOGIN_ERROR_HANDLED',
    error: error
  });
};

var loginLinkEpic = function loginLinkEpic(action$, _ref2) {
  var getState = _ref2.getState;
  return action$.ofType(_reactReduxFirebase.actionTypes.LOGIN).mergeMap(function (_ref3) {
    var auth = _ref3.auth;
    var state = getState();

    if (state.auth.linkProviders) {
      var cred = state.auth.credential;
      var promise = auth.linkAndRetrieveDataWithCredential(cred);
      return _rxjs.Observable.fromPromise(promise).mergeMap(function () {
        return _rxjs.Observable.of((0, _actions3.setLinkProviders)({
          linkProviders: false,
          credential: {}
        }));
      }).catch(function (error) {
        return loginErrorHandled(error);
      });
    }

    return loginErrorHandled();
  });
};

var loginErrorEpic = function loginErrorEpic(action$, _ref4) {
  var getFirebase = _ref4.getFirebase;
  return action$.ofType(_reactReduxFirebase.actionTypes.LOGIN_ERROR).mergeMap(function (_ref5) {
    var authError = _ref5.authError;
    if (!authError) return loginErrorHandled();

    if (authError.code === 'auth/account-exists-with-different-credential') {
      var firebase = getFirebase();
      var promise = firebase.auth().fetchSignInMethodsForEmail(authError.email);
      return _rxjs.Observable.fromPromise(promise).mergeMap(function (methods) {
        if (methods.includes('password')) {
          return _rxjs.Observable.of((0, _actions3.setPage)('signIn'), (0, _reduxForm.change)('auth/signin', 'email', authError.email), (0, _actions3.setLinkProviders)({
            linkProviders: true,
            credential: authError.credential
          }));
        }

        return loginErrorHandled();
      }).catch(function (error) {
        return loginErrorHandled(error);
      });
    }

    return loginErrorHandled();
  });
};

var _default = [loginLinkEpic, accessTokenEpic, loginErrorEpic];
exports.default = _default;