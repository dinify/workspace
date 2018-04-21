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

export function ChangeBank({ bank_name, beneficiary_name, iban }) {
  return Post({ path: `restaurant/my`, v3: true }, {
    payout: {
      bank_name, beneficiary_name, iban
    }
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

export function ChangeHours({ restaurantId, weekdayFrom, weekdayTo, weekendFrom, weekendTo }) {
  return Put({ path: `api/v2/restaurant/${restaurantId}/businesshours`, v2: true }, {
    weekdayFrom, weekdayTo, weekendFrom, weekendTo
  })
}

//export function AddTablet({ restaurantId, login_id, pass_enc, name }) {
//  return Post({ path: `restaurant/${restaurantId}/shop` }, { login_id, pass_enc, name })
//}

export function CreateWaiterboard({ login, password, name }) {
  console.log(login, password, name);
  return Post({ path: `api/v2/restaurant/waiterboard/register`, v2: true }, { login, password, name })
}

export function GetBills({ from, to }) {
  return Post({ path: `api/v2/restaurant/billing`, v2: true }, { from, to })
}

export function GetCategories() {
  return Get({ path: `restaurant/my/categories`, v3: true })
}
// Create Category
export function AddCategory({ categoryName }) {
  return Post({ path: `menu/category/create`, v3: true }, { name: categoryName })
}
// Create Item
export function AddFood({ categoryId, foodName }) {
  return Post({ path: `menu/item/create`, v3: true }, {
    name: foodName,
  	menu_category_id: categoryId,
      "price": {
          "amount": 2,
          "currency": "KWD"
      }
    })
}

export function UpdateFood({ foodId, name, description, price, calories }) {
  return Post({ path: `menu/item/${foodId}`, v3: true }, {
    name: name || undefined,
    description: description || undefined,
    price: {
      amount: price || 1,
      currency: "KWD"
    },
    //calories: calories || undefined
  })
}

export function UpdateNutrition({ foodId, calories, protein, fat, carb }) {
  return Post({ path: `menu/item/${foodId}`, v3: true }, {
    calories: calories
  })
}

export function ToggleCategory({ categoryId, enabled }) {
  return Post({ path: `menu/category/${categoryId}`, v3: true }, { published: enabled })
}
export function ToggleFood({ foodId, enabled }) {
  return Post({ path: `menu/item/${foodId}`, v3: true }, { published: enabled })
}

export function RmTable({ id }) {
  return Post({ path: `table/${id}/delete`, v3: true })
}

export function GetAddons() {
  return Get({ path: `restaurant/my/addons`, v3: true })
}

export function AddAddon({ name, price }) {
  return Post({ path: `api/v2/restaurant/addon`, v2: true }, { name, price })
}

export function AddAddonprice({ addonId, price }) {
  return Post({ path: `api/v2/restaurant/addon/${addonId}`, v2: true }, { price })
}

// API V2
export function ChangeImage({ file, restaurantId }) {
  return PostMultipart({ path: `api/v2/restaurant/upload/${restaurantId}`, v2: true }, { file })
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

export function AddFoodaddon({ foodId, addonId }) {
  return Post({ path: `api/v2/restaurant/food/${foodId}/addon`, v2: true }, { addonId })
}
export function RmFoodaddon({ foodId, addonId }) {
  return Delete({ path: `api/v2/restaurant/food/${foodId}/addon`, v2: true }, { addonId })
}

export function AddTables({ from, to, waiterboardId }) {
  return Post({ path: `api/v2/restaurant/waiterboard/tables`, v2: true }, { from, to, waiterboardId })
}

export function AddTable({ position, waiterboardId }) {
  return Post({ path: `api/v2/restaurant/waiterboard/table`, v2: true }, { position, waiterboardId })
}

export function RmWb({ id }) {
  return Delete({ path: `api/v2/restaurant/waiterboard`, v2: true }, { id })
}

//export function RemoveTablet({ restaurantId, login_id }) {
//  return Delete({ path: `restaurant/${restaurantId}/shop` }, { login_id })
//}
