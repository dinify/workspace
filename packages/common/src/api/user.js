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
  gender: string,
  birthday: string,
  registrationType: 'FACEBOOK'
}
export function Register(
  {
    name, phone, email, password, accessToken, gender, birthday, registrationType
  }: RegisterLocalProps | RegisterFacebookProps
) {
  const body = {
    name,
    phone,
    email,
    gender: gender || 'OTHER',
    birth_date: birthday || '1990-01-01',
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

export function LoginWithGoogle({ accessToken }) {
  return Post(
    {
      path: 'user/login/google',
      noToken: true,
    },
    {
      oauth_access_token: accessToken
    }
  );
}

export function GetUser({ id }) {
  return Get({
    endpoint: 'https://us-central1-tabb-global.cloudfunctions.net/api/',
    path: `user/${id}`
  })
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
