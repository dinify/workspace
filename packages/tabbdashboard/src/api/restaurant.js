import { Get, Post, Put, Delete, PostMultipart } from './Network'
import R from 'ramda'

export function Login({ email, password }) {
  return Post({ path: 'oauth2/authentication', noToken: true }, {
    username: email,
    password,
    grant_type: "password",
    client_id: "1",
    client_secret: "secretKey",
    scope: "restaurant"
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

export function ChangeLocation({ restaurantId, name, longitude, latitude }) {
  return Put({ path: `restaurant/${restaurantId}/location` }, { name, longitude, latitude })
}

export function ChangeBank({ restaurantId, name, beneficiaryName, IBAN }) {
  return Put({ path: `restaurant/${restaurantId}/bank` }, { name, beneficiaryName, IBAN })
}

export function ChangeHours({ restaurantId, weekdayFrom, weekdayTo, weekendFrom, weekendTo }) {
  return Put({ path: `restaurant/${restaurantId}/businesshours` }, {
    weekday: {from: Number(weekdayFrom), to: Number(weekdayTo)},
    weekend: {from: Number(weekendFrom), to: Number(weekendTo)}
  })
}

export function AddTablet({ restaurantId, login_id, pass_enc, name }) {
  return Post({ path: `restaurant/${restaurantId}/shop` }, { login_id, pass_enc, name })
}

export function GetBills({ from, to }) {
  return Post({ path: `api/v2/restaurant/billing`, v2: true }, { from, to })
}

export function GetCategories({ restaurantId }) {
  return Get({ path: `restaurant/${restaurantId}/categories` })
}
export function AddCategory({ restaurantId, categoryName }) {
  return Post({ path: `restaurant/${restaurantId}/category` }, { name: categoryName })
}
export function UpdateFood({ restaurantId, categoryId, foodId, name, description, price, calories, used, order }) {
  const updateObject = R.pickBy(R.identity, { name, description, price, calories, used, order })
  return Put({ path: `restaurant/${restaurantId}/category/${categoryId}/food/${foodId}` }, updateObject)
}
export function AddFood({ restaurantId, categoryId, foodName }) {
  return Post({ path: `restaurant/${restaurantId}/category/${categoryId}/food` }, { name: foodName })
}

// API V2
export function UploadMainImage({ file }) {
  return PostMultipart({ path: `api/v2/restaurant/upload`, v2: true }, { file })
}
export function ToggleCategory({ categoryId, enabled }) {
  return Put({ path: `api/v2/restaurant/disable/category/${categoryId}`, v2: true }, { enabled })
}
export function ToggleFood({ foodId, enabled }) {
  return Put({ path: `api/v2/restaurant/disable/food/${foodId}`, v2: true }, { enabled })
}

export function GetFoodoptions({ foodId }) {
  return Get({ path: `api/v2/restaurant/food/${foodId}/options`, v2: true })
}
export function AddFoodoption({ foodId, optionName }) {
  return Post({ path: `api/v2/restaurant/food/${foodId}/option`, v2: true }, { optionName })
}
export function RmFoodoption({ foodId, optionName }) {
  return Delete({ path: `api/v2/restaurant/food/${foodId}/option`, v2: true }, { optionName })
}

export function GetFoodingredients({ foodId }) {
  return Get({ path: `api/v2/restaurant/food/${foodId}/ingredients`, v2: true })
}
export function AddFoodingredient({ foodId, ingredientName }) {
  return Post({ path: `api/v2/restaurant/food/${foodId}/ingredient`, v2: true }, { ingredientName })
}
export function RmFoodingredient({ foodId, ingredientName }) {
  return Delete({ path: `api/v2/restaurant/food/${foodId}/ingredient`, v2: true }, { ingredientName })
}

export function GetFoodaddons({ foodId }) {
  return Get({ path: `api/v2/restaurant/food/${foodId}/addons`, v2: true })
}
export function AddFoodaddon({ foodId, addonId }) {
  return Post({ path: `api/v2/restaurant/food/${foodId}/addon`, v2: true }, { addonId })
}
export function RmFoodaddon({ foodId, addonId }) {
  return Delete({ path: `api/v2/restaurant/food/${foodId}/addon`, v2: true }, { addonId })
}

//export function RemoveTablet({ restaurantId, login_id }) {
//  return Delete({ path: `restaurant/${restaurantId}/shop` }, { login_id })
//}
