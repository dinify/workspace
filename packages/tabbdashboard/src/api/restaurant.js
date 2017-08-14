import { Get, Post, Put, Delete } from './Network'


export function Login({ email, password }) {
  return Post({ path: 'restaurant/auth/restauration', noToken: true }, {
    username: email,
    password,
    grant_type: "password",
    client_id: "1",
    client_secret: "secretKey",
    scope: "*"
  })
}

export function Logout() {
  return Delete({ path: 'restaurant/auth/restauration' })
}

export function Signup({ email, password, restaurantName, nameInCharge, mobile }) {
  return Post({ path: 'restaurant/register', noToken: true }, {
    email,
    password,
    name: restaurantName,
    nameChargue: nameInCharge,
    number: mobile,
  })
}

export function GetRestaurant({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}` })
}

export function GetLoggedRestaurant() {
  return Get({ path: `restaurant/logged` })
}

export function ChangeCategory({ restaurantId, category }) {
  return Put({ path: `restaurant/${restaurantId}/category` }, { category })
}

export function ChangeName({ restaurantId, restaurantName }) {
  return Put({ path: `restaurant/${restaurantId}/name` }, { name: restaurantName })
}

export function ChangeContact({ restaurantId, mobile, email, nameInCharge }) {
  return Put({ path: `restaurant/${restaurantId}/contact` }, { mobileNumber: mobile, emailAddress: email, nameInCharge })
}

export function ChangeSocial({ restaurantId, facebookURL, instagramURL }) {
  return Put({ path: `restaurant/${restaurantId}/social` }, { facebookURL, instagramURL })
}
