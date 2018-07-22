// @flow
import { Get, Post } from './Network';

type RegisterLocalProps = {
  name: string,
  phone: string,
  email: string,
  password: string,
  registrationType: 'LOCAL'
}
type RegisterFacebookProps = {
  name: string,
  phone: string,
  email: string,
  accessToken: string,
  registrationType: 'FACEBOOK'
}
export function Register(
  { name, phone, email, password, accessToken, registrationType }: RegisterLocalProps | RegisterFacebookProps
) {
  const body = {
    name,
    phone,
    email,
    gender: 'OTHER',
    birth_date: '1990-01-01',
    registration_type: registrationType
  }
  if (password) body.password = password;
  if (accessToken) body.oauth_access_token = accessToken;
  return Post({ path: 'user/register', noToken: true }, body);
}

type LoginProps = {
  email: string,
  password: string,
}
export function Login({ email, password }: LoginProps) {
  return Post(
    {
      path: 'user/login',
      noToken: true,
    },
    {
      email,
      password,
    },
  );
}
export function LoginWithFacebook({ accessToken }) {
  return Post(
    {
      path: 'user/login/facebook',
      noToken: true,
    },
    {
      oauth_access_token: accessToken
    }
  );
}

export function GetMe() {
  return Get({ path: 'user/my' });
}

export function GetUser({ id }) {
  return Get({ v3: true, path: `user/${id}` })
}
