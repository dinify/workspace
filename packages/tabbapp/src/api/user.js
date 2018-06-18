import { Get, Post } from './Network'

export function Register({ name, phone, email, password}) {
  return Post({
    path: 'user/register', noToken: true
  }, {
    email,
    password,
    name,
    phone,
    gender: 'OTHER',
    birth_date: '1990-01-01',
    registration_type: 'LOCAL'
  })
}

export function Login({ email, password }) {
  return Post({
    path: 'user/login', noToken: true
  }, {
    email, password
  })
}
