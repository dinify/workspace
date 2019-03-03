"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Register = Register;
exports.Login = Login;
exports.LoginWithFacebook = LoginWithFacebook;
exports.LoginWithGoogle = LoginWithGoogle;
exports.GetMe = GetMe;
exports.GetUser = GetUser;
exports.RegisterFirebaseToken = RegisterFirebaseToken;

var _Network = require("./Network");

function Register(_ref) {
  var name = _ref.name,
      phone = _ref.phone,
      email = _ref.email,
      password = _ref.password,
      accessToken = _ref.accessToken,
      gender = _ref.gender,
      birthday = _ref.birthday,
      registrationType = _ref.registrationType;
  var body = {
    name: name,
    phone: phone,
    email: email,
    gender: gender || 'OTHER',
    birth_date: birthday || '1990-01-01',
    registration_type: registrationType
  };
  if (password) body.password = password;
  if (accessToken) body.oauth_access_token = accessToken;
  return (0, _Network.Post)({
    path: 'user/register',
    noToken: true
  }, body);
}

function Login(_ref2) {
  var email = _ref2.email,
      password = _ref2.password;
  return (0, _Network.Post)({
    path: 'user/login',
    noToken: true
  }, {
    email: email,
    password: password
  });
}

function LoginWithFacebook(_ref3) {
  var accessToken = _ref3.accessToken;
  return (0, _Network.Post)({
    path: 'user/login/facebook',
    noToken: true
  }, {
    oauth_access_token: accessToken
  });
}

function LoginWithGoogle(_ref4) {
  var accessToken = _ref4.accessToken;
  return (0, _Network.Post)({
    path: 'user/login/google',
    noToken: true
  }, {
    oauth_access_token: accessToken
  });
}

function GetMe() {
  return (0, _Network.Get)({
    path: 'user/my'
  });
}

function GetUser(_ref5) {
  var id = _ref5.id;
  return (0, _Network.Get)({
    endpoint: 'https://us-central1-tabb-global.cloudfunctions.net/api/',
    path: "user/".concat(id)
  });
}

function RegisterFirebaseToken(_ref6) {
  var token = _ref6.token;
  return (0, _Network.Post)({
    path: 'token/firebase/register'
  }, {
    token: token
  });
}