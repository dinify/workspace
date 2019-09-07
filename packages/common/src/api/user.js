import { Get, Post } from './Network';

const nodeEndpoint = 'https://api.dinify.app/v2/'

export function GetUser({ id }) {
  return Get({
    endpoint: nodeEndpoint,
    path: `user/${id}`
  });
}

export function RegisterFirebaseToken({ token }) {
  return Post(
    {
      path: 'token/firebase/register'
    },
    {
      token
    }
  );
}
