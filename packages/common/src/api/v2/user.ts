import { Get, Post } from './Network';

export const GetUser = ({ id }: { id: string }) => Get({ path: `user/${id}` });

export const RegisterFirebaseToken = ({ token }: any) => Post({
  path: 'token/firebase/register'
}, { token });
