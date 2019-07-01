import * as types from './types';

export const setPage = (page) => ({
  type: types.SET_PAGE,
  payload: page
});

export const setShowPassword = (showPassword) => ({
  type: types.SET_SHOWPASSWORD,
  payload: showPassword
});

export const setLinkProviders = (payload) => ({
  type: types.SET_LINKPROVIDERS,
  payload
});

export const loginInit = ({ email, password, qr }) => ({
  type: types.LOGIN_INIT,
  payload: { email, password, qr },
});

export const loginDone = () => ({
  type: types.LOGIN_DONE,
});

export const loginFail = (e) => ({
  type: types.LOGIN_FAIL,
  payload: e
});

export const signupInit = ({ name, phone, email, password, qr }) => ({
  type: types.SIGNUP_INIT,
  payload: { name, phone, email, password, qr },
});

export const signupDone = () => ({
  type: types.SIGNUP_DONE,
});

export const signupFail = (e) => ({
  type: types.SIGNUP_FAIL,
  payload: e
});

export const fbAuthInit = ({ fbRes, qr }) => ({
  type: types.FBAUTH_INIT,
  payload: { fbRes, qr }
});

export const fbAuthDone = () => ({
  type: types.FBAUTH_DONE,
});

export const fbAuthFail = (e) => ({
  type: types.FBAUTH_FAIL,
  payload: e
});

export const googleAuthInit = ({ googleRes }) => ({
  type: types.GOOGLE_AUTH_INIT,
  payload: { googleRes }
});

export const googleAuthDone = () => ({
  type: types.GOOGLE_AUTH_DONE,
});

export const googleAuthFail = (e) => ({
  type: types.GOOGLE_AUTH_FAIL,
  payload: e
});

export const logoutInit = () => ({
  type: types.LOGOUT_INIT,
});

export const logoutDone = () => ({
  type: types.LOGOUT_DONE,
});
