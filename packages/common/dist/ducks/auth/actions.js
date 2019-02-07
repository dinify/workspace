"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutDone = exports.logoutInit = exports.googleAuthFail = exports.googleAuthDone = exports.googleAuthInit = exports.fbAuthFail = exports.fbAuthDone = exports.fbAuthInit = exports.signupFail = exports.signupDone = exports.signupInit = exports.loginFail = exports.loginDone = exports.loginInit = exports.setLinkProviders = exports.setShowPassword = exports.setPage = void 0;

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setPage = function setPage(page) {
  return {
    type: _types.default.SET_PAGE,
    payload: page
  };
};

exports.setPage = setPage;

var setShowPassword = function setShowPassword(showPassword) {
  return {
    type: _types.default.SET_SHOWPASSWORD,
    payload: showPassword
  };
};

exports.setShowPassword = setShowPassword;

var setLinkProviders = function setLinkProviders(payload) {
  return {
    type: _types.default.SET_LINKPROVIDERS,
    payload: payload
  };
};

exports.setLinkProviders = setLinkProviders;

var loginInit = function loginInit(_ref) {
  var email = _ref.email,
      password = _ref.password,
      qr = _ref.qr;
  return {
    type: _types.default.LOGIN_INIT,
    payload: {
      email: email,
      password: password,
      qr: qr
    }
  };
};

exports.loginInit = loginInit;

var loginDone = function loginDone() {
  return {
    type: _types.default.LOGIN_DONE
  };
};

exports.loginDone = loginDone;

var loginFail = function loginFail(e) {
  return {
    type: _types.default.LOGIN_FAIL,
    payload: e
  };
};

exports.loginFail = loginFail;

var signupInit = function signupInit(_ref2) {
  var name = _ref2.name,
      phone = _ref2.phone,
      email = _ref2.email,
      password = _ref2.password,
      qr = _ref2.qr;
  return {
    type: _types.default.SIGNUP_INIT,
    payload: {
      name: name,
      phone: phone,
      email: email,
      password: password,
      qr: qr
    }
  };
};

exports.signupInit = signupInit;

var signupDone = function signupDone() {
  return {
    type: _types.default.SIGNUP_DONE
  };
};

exports.signupDone = signupDone;

var signupFail = function signupFail(e) {
  return {
    type: _types.default.SIGNUP_FAIL,
    payload: e
  };
};

exports.signupFail = signupFail;

var fbAuthInit = function fbAuthInit(_ref3) {
  var fbRes = _ref3.fbRes,
      qr = _ref3.qr;
  return {
    type: _types.default.FBAUTH_INIT,
    payload: {
      fbRes: fbRes,
      qr: qr
    }
  };
};

exports.fbAuthInit = fbAuthInit;

var fbAuthDone = function fbAuthDone() {
  return {
    type: _types.default.FBAUTH_DONE
  };
};

exports.fbAuthDone = fbAuthDone;

var fbAuthFail = function fbAuthFail(e) {
  return {
    type: _types.default.FBAUTH_FAIL,
    payload: e
  };
};

exports.fbAuthFail = fbAuthFail;

var googleAuthInit = function googleAuthInit(_ref4) {
  var googleRes = _ref4.googleRes;
  return {
    type: _types.default.GOOGLE_AUTH_INIT,
    payload: {
      googleRes: googleRes
    }
  };
};

exports.googleAuthInit = googleAuthInit;

var googleAuthDone = function googleAuthDone() {
  return {
    type: _types.default.GOOGLE_AUTH_DONE
  };
};

exports.googleAuthDone = googleAuthDone;

var googleAuthFail = function googleAuthFail(e) {
  return {
    type: _types.default.GOOGLE_AUTH_FAIL,
    payload: e
  };
};

exports.googleAuthFail = googleAuthFail;

var logoutInit = function logoutInit() {
  return {
    type: _types.default.LOGOUT_INIT
  };
};

exports.logoutInit = logoutInit;

var logoutDone = function logoutDone() {
  return {
    type: _types.default.LOGOUT_DONE
  };
};

exports.logoutDone = logoutDone;