import { Get, Post } from './Network'

export function RegisterUser({ name, phone, email, password}) {
  return Post({
    path: 'user/register', noToken: true, v3: true
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
export function LoginUser({ email, password }) {
  return Post({
    path: 'user/login', noToken: true, v3: true
  }, {
    email, password
  })
}
export function CreateRestaurant({ name, subdomain }) {
  return Post({
    path: 'restaurant/create', v3: true
  }, {
    name, subdomain
  })
}

export function GetLoggedRestaurant() {
  return Get({ path: `restaurant/my/all`, v3: true })
}

export function ChangeCategory({ category }) {
  return Post({ path: `restaurant/my`, v3: true }, {
    type: category
  })
}

export function ChangeName({ restaurantId, name }) {
  return Post({ path: `restaurant/${restaurantId}`, v3: true }, { name })
}

export function ChangeContact({ phone, email, website }) {
  return Post({ path: `restaurant/my`, v3: true }, {
    contact: {
      phone, email, website
    }
  })
}

export function ChangeBank({ bank_name, beneficiary_name, iban, bic }) {
  return Post({ path: `restaurant/my/payout`, v3: true }, {
    bank_name, beneficiary_name, iban, bic
  })
}
