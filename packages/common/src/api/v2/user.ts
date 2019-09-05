import { Get, Post } from './Network';

export const GetUser = ({ id }) => Get({ path: `user/${id}` });

export const RegisterFirebaseToken = ({ token }) => Post({
  path: 'token/firebase/register'
}, { token});
