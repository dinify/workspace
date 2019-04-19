"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _reduxObservable = require("redux-observable");

var _reactReduxFirebase = require("react-redux-firebase");

var _AccountExistsDialog = _interopRequireDefault(require("../../components/dialogs/AccountExistsDialog"));

var API = _interopRequireWildcard(require("../../api/user"));

var _FN = require("../../lib/FN");

var _reduxForm = require("redux-form");

var _actions = require("./actions");

var _actions2 = require("../ui/actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var accessTokenEpic = function accessTokenEpic(action$, state$) {
  return action$.pipe((0, _operators.filter)(function (action) {
    var triggerOn = [_reactReduxFirebase.actionTypes.LOGIN, _reactReduxFirebase.actionTypes.AUTH_EMPTY_CHANGE];
    return triggerOn.includes(action.type);
  }), (0, _operators.mergeMap)(function () {
    var auth = state$.value.firebase.auth;

    if (auth.stsTokenManager && auth.stsTokenManager.accessToken) {
      (0, _FN.setCookie)('access_token', auth.stsTokenManager.accessToken, 90);
    } else (0, _FN.setCookie)('access_token', '', 1);

    return (0, _rxjs.of)({
      type: 'ACCESSTOKEN_HANDLED'
    });
  }));
}; // return this.loginUser(error.email, params.password).then(result => {
//   console.log('Reauthentication result', result);
//   result.user.linkAndRetrieveDataWithCredential(pendingCred).then((usercred) => {
//     console.log('New credential successfully linked', usercred);
//   }).catch(error => {
//     console.log('Credential linking error', error);
//   });
// });


var loginErrorHandled = function loginErrorHandled(error) {
  return (0, _rxjs.of)({
    type: 'LOGIN_ERROR_HANDLED',
    error: error
  });
};

var loginLinkHandled = function loginLinkHandled() {
  return (0, _rxjs.of)({
    type: 'LOGIN_LINK_HANDLED'
  });
};

var loginLinkEpic = function loginLinkEpic(action$, state$) {
  return action$.pipe((0, _reduxObservable.ofType)(_reactReduxFirebase.actionTypes.LOGIN), (0, _operators.mergeMap)(function (_ref) {
    var auth = _ref.auth;

    if (state$.value.auth.linkProviders) {
      var cred = state$.value.auth.credential;
      var promise = auth.linkAndRetrieveDataWithCredential(cred);
      return (0, _rxjs.from)(promise).pipe((0, _operators.map)(function () {
        return (0, _rxjs.of)((0, _actions.setLinkProviders)({
          linkProviders: false,
          credential: {}
        }));
      }), (0, _operators.catchError)(function (error) {
        return loginErrorHandled(error);
      }));
    }

    return loginLinkHandled();
  }));
};

var loginErrorEpic = function loginErrorEpic(action$) {
  return action$.pipe((0, _reduxObservable.ofType)(_reactReduxFirebase.actionTypes.LOGIN_ERROR), (0, _operators.mergeMap)(function (_ref2) {
    var authError = _ref2.authError;
    if (!authError) return loginErrorHandled();

    if (authError.code === 'auth/account-exists-with-different-credential') {
      var firebase = (0, _reactReduxFirebase.getFirebase)();
      var promise = firebase.auth().fetchSignInMethodsForEmail(authError.email);
      return (0, _rxjs.from)(promise).pipe((0, _operators.mergeMap)(function (methods) {
        if (methods.includes('password')) {
          return (0, _rxjs.of)((0, _actions.setPage)('signIn'), (0, _reduxForm.change)('auth/signin', 'email', authError.email), (0, _actions.setLinkProviders)({
            linkProviders: true,
            credential: authError.credential
          }));
        } else {
          return (0, _rxjs.of)((0, _actions.setLinkProviders)({
            linkProviders: true,
            credential: authError.credential
          }), (0, _actions2.openDialog)({
            id: 'account-exists',
            component: function component(props) {
              return _react.default.createElement(_AccountExistsDialog.default, _extends({
                providerName: authError.credential.providerId,
                email: authError.email,
                methods: methods
              }, props));
            }
          }));
        }

        return loginErrorHandled();
      }), (0, _operators.catchError)(function (error) {
        return loginErrorHandled(error);
      }));
    }

    return loginErrorHandled();
  }));
};

var _default = [loginLinkEpic, accessTokenEpic, loginErrorEpic];
exports.default = _default;