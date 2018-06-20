// @flow
import { Get, Post } from './Network';

type RegisterProps = {
  name: string,
  phone: string,
  email: string,
  password: string,
}
export function Register({ name, phone, email, password }: RegisterProps) {
  return Post(
    {
      path: 'user/register',
      noToken: true,
    },
    {
      email,
      password,
      name,
      phone,
      gender: 'OTHER',
      birth_date: '1990-01-01',
      registration_type: 'LOCAL',
    },
  );
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

export function GetMe() {
  return Get({ path: 'user/my' });
}
