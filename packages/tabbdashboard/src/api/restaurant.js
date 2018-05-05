import { Get, Post, Put, Delete, PostMultipart } from './Network'
import R from 'ramda'

export function RegisterUser({ name, phone, email, password}) {
  return Post({
    path: 'user/register', noToken: true, v3: true
  }, {
    email,
    password,
    name,
    phone,
    gender: "OTHER",
    birth_date: "1/1/1990"
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

export function ChangeSocial({ facebook, instagram }) {
  return Post({ path: `restaurant/my`, v3: true }, {
    social: {
      facebook, instagram
    }
  })
}

export function ChangeLocation({ longitude, latitude }) {
  return Post({ path: `restaurant/my`, v3: true }, {
    longitude: longitude,
    latitude: latitude
  })
}

export function ChangeHours(payload) {
  delete payload['restaurantId']
  const openHours = payload
  return Post({ path: `restaurant/my`, v3: true }, {open_hours: openHours})
}

//export function AddTablet({ restaurantId, login_id, pass_enc, name }) {
//  return Post({ path: `restaurant/${restaurantId}/shop` }, { login_id, pass_enc, name })
//}

export function CreateWaiterboard({ name }) {
  return Post({ path: `waiterboard/create`, v3: true }, { name })
}

export function DeleteWaiterboard({ id }) {
  return Post({ path: `waiterboard/${id}/delete`, v3: true }, { id })
}

export function CreateTable({ number, capacity, waiterboardId, x, y }) {
  return Post({ path: `table/create`, v3: true }, { number, capacity, waiterboard_id: waiterboardId, x, y })
}
export function ChangeTable({ id, x, y }) {
  return Post({ path: `table/${id}`, v3: true }, { x, y })
}

export function DeleteTable({ id }) {
  return Post({ path: `table/${id}/delete`, v3: true })
}

export function GetBills({ from, to }) {
  return Post({ path: `api/v2/restaurant/billing`, v2: true }, { from, to })
}

export function GetCategories() {
  return Get({ path: `restaurant/my/categories`, v3: true })
}
export function CreateCategory({ categoryName }) {
  return Post({ path: `menu/category/create`, v3: true }, { name: categoryName })
}
export function ChangeMenucategory(payload) {
  const { id } = payload
  delete payload.restaurantId
  delete payload.id
  return Post({ path: `menu/category/${id}`, v3: true }, payload)
}
// Create Item
export function CreateFood({ categoryId, foodName }) {
  return Post({ path: `menu/item/create`, v3: true }, {
    name: foodName,
  	menu_category_id: categoryId,
    price: {
        amount: 2,
        currency: "KWD"
    }})
}

export function ChangeFood(payload) {
  const foodId = payload.foodId
  let updObj = payload
  delete updObj.foodId
  updObj = R.filter(R.identity)(updObj)
  return Post({ path: `menu/item/${foodId}`, v3: true }, updObj)
}

export function ChangeNutrition({ foodId, total, proteins, fats, carbs}) {
  return Post({ path: `menu/item/${foodId}`, v3: true }, {
    calories: {
      total, proteins, fats, carbs
    }
  })
}

export function ToggleCategory({ categoryId, enabled }) {
  return Post({ path: `menu/category/${categoryId}`, v3: true }, { published: enabled })
}
export function ToggleFood({ foodId, enabled }) {
  return Post({ path: `menu/item/${foodId}`, v3: true }, { published: enabled })
}

export function GetAddons() {
  return Get({ path: `restaurant/my/addons`, v3: true })
}

export function AddAddon({ name, price }) {
  return Post({ path: `menu/addon/create`, v3: true }, { name, price: {
      amount: price,
      currency: "KWD"
  } })
}

export function AddAddonprice({ addonId, price }) {
  return Post({ path: `menu/addon/${addonId}`, v3: true }, { price: {
      amount: price,
      currency: "KWD"
  } })
}

export function AddIngredient({ name }) {
  return Post({ path: `menu/ingredient/create`, v3: true }, { name })
}

export function AddOption({ name }) {
  return Post({ path: `menu/option/create`, v3: true }, { name })
}


// API V2
export function ChangeItemimage({ file, id }) {
  return PostMultipart({ path: `menu/item/${id}/image/upload`, v3: true }, { image: file })
}

export function ChangeImage({ file }) {
  return PostMultipart({ path: `restaurant/my/image/upload`, v3: true }, { image: file })
}

export function EditImage({ id, precedence, published }) {
  return Post({ path: `image/${id}`, v3: true }, { precedence, published })
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

export function RmFoodingredient({ foodId, ingredientName }) {
  return Delete({ path: `api/v2/restaurant/food/${foodId}/ingredient`, v2: true }, { ingredientName })
}

export function AddFoodaddon({ foodId, addonId }) {
  return Post({ path: `api/v2/restaurant/food/${foodId}/addon`, v2: true }, { addonId })
}
export function RmFoodaddon({ foodId, addonId }) {
  return Delete({ path: `api/v2/restaurant/food/${foodId}/addon`, v2: true }, { addonId })
}

export function ChangeFoodingredient({ foodId, ingredients }) {
  return Post({ path: `menu/item/${foodId}`, v3: true }, { ingredients })
}

//export function RemoveTablet({ restaurantId, login_id }) {
//  return Delete({ path: `restaurant/${restaurantId}/shop` }, { login_id })
//}
