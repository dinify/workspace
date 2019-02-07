"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClaims = void 0;

var _reselect = require("reselect");

var parseJwt = function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

var getClaims = (0, _reselect.createSelector)([function (state) {
  return state.firebase.auth;
}], function (auth) {
  if (!auth.stsTokenManager || !auth.stsTokenManager.accessToken) return null;
  var token = auth.stsTokenManager.accessToken;
  return parseJwt(token);
});
exports.getClaims = getClaims;