import { Get, Post } from './Network'

export function GetRestaurants() {
  return Get({ path: `restaurant/list` })
}

export function CreateRestaurant({ name, subdomain }) {
  return Post(
    {
      path: 'restaurant/create',
    },
    {
      name,
      subdomain,
    },
  )
}

export function GetLoggedRestaurant() {
  return Get({ path: `restaurant/my/all` })
}

export function ChangeCategory({ category }) {
  return Post(
    { path: `restaurant/my` },
    {
      type: category,
    },
  )
}

export function ChangeName({ restaurantId, name }) {
  return Post({ path: `restaurant/${restaurantId}` }, { name })
}

export function ChangeContact({ phone, email, website }) {
  return Post(
    { path: `restaurant/my` },
    {
      contact: {
        phone,
        email,
        website,
      },
    },
  )
}

export function ChangeBank({ bank_name, beneficiary_name, iban, bic }) {
  return Post(
    { path: `restaurant/my/payout` },
    {
      bank_name,
      beneficiary_name,
      iban,
      bic,
    },
  )
}
