import { createSelector } from 'reselect'

const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export const getClaims = createSelector(
  [
    (state) => state.firebase.auth,
  ],
  (auth) => {
    if (!auth.stsTokenManager || !auth.stsTokenManager.accessToken) return null;
    const token = auth.stsTokenManager.accessToken;
    return parseJwt(token);
  }
)
