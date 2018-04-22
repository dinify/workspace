// @flow
import { Observable } from 'rxjs'
import R from 'ramda'

import * as API from '../api/restaurant'
import type { EpicDependencies, Error, Action } from '../flow'

export const BOOTSTRAP = 'BOOTSTRAP'
export const LOGIN_INIT = 'LOGIN_INIT'
export const LOGIN_DONE = 'LOGIN_DONE'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'
export const SIGNUP_INIT = 'SIGNUP_INIT'
export const SIGNUP_DONE = 'SIGNUP_DONE'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export const LOGGED_FETCHED_DONE = 'LOGGED_FETCHED_DONE'
export const UPDATE_CONTACT_INIT = 'UPDATE_CONTACT_INIT'
export const UPDATE_SOCIAL_INIT = 'UPDATE_SOCIAL_INIT'
export const UPDATE_LOCATION_INIT = 'UPDATE_LOCATION_INIT'
export const UPDATE_BANK_INIT = 'UPDATE_BANK_INIT'
export const UPDATE_HOURS_INIT = 'UPDATE_HOURS_INIT'
export const ADD_WB_INIT = 'ADD_WB_INIT'
export const ADD_WB_DONE = 'ADD_WB_DONE'
export const GET_BILLS_INIT = 'GET_BILLS_INIT'
export const GET_BILLS_DONE = 'GET_BILLS_DONE'
export const GET_CATEGORIES_INIT = 'GET_CATEGORIES_INIT'
export const GET_CATEGORIES_DONE = 'GET_CATEGORIES_DONE'

type State = {
  searchLoading: boolean,
  appRun: boolean,
  lastError: ?Error,
  loggedRestaurant: ?Object,
}

const initialState = {
  searchLoading: false,
  appRun: false,
  joke: null,
  lastError: null,
  loggedRestaurant: null,
  updateDone: null,
  addTabletDone: null,
  bills: [],
  categories: [],
  selectedCategoryId: null,
  selectedFoodId: null,
  foodOptions: {},
  foodIngredients: {},
  foodAddons: {},
  addons: []
}

// Reducer
export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case LOGIN_DONE:
      return state
    case BOOTSTRAP:
      return R.assoc('appRun', true)(state)
    case LOGGED_FETCHED_DONE: {
      return R.assoc('loggedRestaurant', action.payload)(state)
    }
    case 'UPDATE_LOCATION_INIT':
      state = R.assocPath(['loggedRestaurant', 'longitude'], action.payload.longitude)(state)
      return R.assocPath(['loggedRestaurant', 'latitude'], action.payload.latitude)(state)
    case 'UPDATE_NAME_INIT':
      return R.assocPath(['loggedRestaurant', 'name'], action.payload.name)(state)
    case 'UPDATE_IMAGE_DONE':
      return R.assocPath(['loggedRestaurant', 'uploadedImage'], action.payload.url)(state)
    case 'UPDATE_CATEGORY_INIT':
      return R.assocPath(['loggedRestaurant', 'category'], action.payload.category)(state)
    case UPDATE_LOCATION_INIT: {
      state = R.assocPath(['loggedRestaurant', 'location', 'longitude'], Number(action.payload.longitude))(state)
      return R.assocPath(['loggedRestaurant', 'location', 'latitude'], Number(action.payload.latitude))(state)
    }
    case UPDATE_BANK_INIT: {
      return R.assocPath(['loggedRestaurant', 'bank'], action.payload)(state)
    }
    case 'UPDATE_DONE':
      return R.assoc('updateDone', 'done')(state)
    case ADD_WB_INIT: {
      const { login, name } = action.payload
      const newTablet = { login, name }
      state = R.assoc('addTabletDone', 'adding')(state)
      return R.assocPath(['loggedRestaurant', 'tablets'], [...state.loggedRestaurant.tablets, newTablet])(state)
    }
    case ADD_WB_DONE:
      return R.assoc('addTabletDone', 'done')(state)
    case GET_BILLS_DONE:
      return R.assoc('bills', action.payload)(state)
    case GET_CATEGORIES_DONE:
      return R.assoc('categories', action.payload.data)(state)
    case 'SELECT_CATEGORY':
      return R.assoc('selectedCategoryId', action.payload.categoryId)(state)
    case 'SELECT_FOOD':
      return R.assoc('selectedFoodId', action.payload.foodId)(state)
    case 'API_GET_FOODOPTIONS_DONE': {
      return R.assocPath(['foodOptions', action.payload.foodId], action.payload.response)(state)
    }
    case 'API_GET_FOODINGREDIENTS_DONE': {
      return R.assocPath(['foodIngredients', action.payload.foodId], action.payload.response)(state)
    }
    case 'API_GET_FOODADDONS_DONE': {
      return R.assocPath(['foodAddons', action.payload.foodId], action.payload.response)(state)
    }
    case 'API_GET_ADDONS_DONE': {
      return R.assoc('addons', action.payload.response.data)(state)
    }
    default:
      return state
  }
}

function setCookie(cname, cvalue, exdays) {
  let d = new Date()
  d.setTime(d.getTime() + (exdays*24*60*60*1000))
  const expires = "expires="+ d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

// Action Creators
export const selectCategoryAction = (payload) => ({ type: 'SELECT_CATEGORY', payload })
export const selectFoodAction = (payload) => ({ type: 'SELECT_FOOD', payload })
export const updateNameInitAction = (payload) => ({ type: 'UPDATE_NAME_INIT', payload })
export const updateDoneAction = () => ({ type: 'UPDATE_DONE' })
export const updateCategoryInitAction = (payload) => ({ type: 'UPDATE_CATEGORY_INIT', payload })
export const updateContactInitAction = (payload) => ({ type: UPDATE_CONTACT_INIT, payload })
export const updateSocialInitAction = (payload) => ({ type: UPDATE_SOCIAL_INIT, payload })
export const updateLocationInitAction = (payload) => ({ type: UPDATE_LOCATION_INIT, payload })
export const updateBankInitAction = (payload) => ({ type: UPDATE_BANK_INIT, payload })
export const updateHoursInitAction = (payload) => ({ type: UPDATE_HOURS_INIT, payload })
export const loginInitAction = (payload) => ({ type: LOGIN_INIT, payload })
export const logoutInitAction = () => {
  setCookie('access_token', '', 1)
  window.location.replace('/login')
  return { type: 'LOGOUT_DONE' }
}
export const loggedFetchedAction = (payload) => ({ type: LOGGED_FETCHED_DONE, payload })
export const signupInitAction = (payload) => ({ type: SIGNUP_INIT, payload })

export const appBootstrap = () => ({ type: BOOTSTRAP })
export const createWaiterboardInitAction = (payload) => ({ type: ADD_WB_INIT, payload })
export const createWaiterboardDoneAction = () => ({ type: ADD_WB_DONE })
export const getBillsInitAction = (payload) => ({ type: GET_BILLS_INIT, payload })
export const getBillsDoneAction = (payload) => ({ type: GET_BILLS_DONE, payload })
export const getCategoriesInitAction = () => ({ type: 'GET_CATEGORIES_INIT' })
export const getCategoriesDoneAction = (payload) => ({ type: GET_CATEGORIES_DONE, payload })
export const rmCategoryInitAction = (payload) => ({ type: 'RM_CATEGORY_INIT', payload })
export const addCategoryInitAction = (payload) => ({ type: 'ADD_CATEGORY_INIT', payload })
export const rmFoodInitAction = (payload) => ({ type: 'RM_FOOD_INIT', payload })
export const addFoodInitAction = (payload) => ({ type: 'ADD_FOOD_INIT', payload })
export const updateFoodInitAction = (payload) => ({ type: 'UPDATE_FOOD_INIT', payload })
export const uploadMainImageInitAction = (payload) => ({ type: 'UPDATE_IMAGE_INIT', payload })

export const updateFoodNutritionInit = (payload) => ({ type: 'UPDATE_NUTRITION_INIT', payload })

export const deleteTableInitAction = (payload) => ({
  type: 'API_RM_TABLE_INIT',
  payload: {
    ...payload,
    successActionType: 'persist/REHYDRATE'
  }
})

export const deleteWBInitAction = (payload) => ({
  type: 'API_RM_WB_INIT',
  payload: {
    ...payload,
    successActionType: 'persist/REHYDRATE'
  }
})

export const addTablesToWBInitAction = (payload) => ({
  type: 'API_ADD_TABLES_INIT',
  payload: {
    ...payload,
    successActionType: 'persist/REHYDRATE'
  }
})
export const addTableToWBInitAction = (payload) => ({
  type: 'API_ADD_TABLE_INIT',
  payload: {
    ...payload,
    successActionType: 'persist/REHYDRATE'
  }
})

export const getFoodOptionsInit = (payload) => ({ type: 'API_GET_FOODOPTIONS_INIT', payload })
export const rmFoodOptionInit = (payload) => ({
  type: 'API_RM_FOODOPTION_INIT',
  payload: {
    ...payload,
    successActionType: 'API_GET_FOODOPTIONS_INIT'
  }
})
export const addFoodOptionInit = (payload) => ({
  type: 'API_ADD_FOODOPTION_INIT',
  payload: {
    ...payload,
    successActionType: 'API_GET_FOODOPTIONS_INIT'
  }
})

export const getAddonsInit = () => ({ type: 'API_GET_ADDONS_INIT' })

export const addAddonInit = (payload) => ({
  type: 'API_ADD_ADDON_INIT',
  payload: {
    ...payload,
    successActionType: 'API_GET_ADDONS_INIT'
  }
})

export const getFoodIngredientsInit = (payload) => ({ type: 'API_GET_FOODINGREDIENTS_INIT', payload })
export const rmFoodIngredientInit = (payload) => ({
  type: 'API_RM_FOODINGREDIENT_INIT',
  payload: {
    ...payload,
    successActionType: 'API_GET_FOODINGREDIENTS_INIT'
  }
})
export const addFoodIngredientInit = (payload) => ({
  type: 'API_ADD_FOODINGREDIENT_INIT',
  payload: {
    ...payload,
    successActionType: 'API_GET_FOODINGREDIENTS_INIT'
  }
})

export const getFoodAddonsInit = (payload) => ({ type: 'API_GET_FOODADDONS_INIT', payload })
export const rmFoodAddonInit = (payload) => ({
  type: 'API_RM_FOODADDON_INIT',
  payload: {
    ...payload,
    successActionType: 'API_GET_FOODADDONS_INIT'
  }
})
export const addFoodAddonInit = (payload) => ({
  type: 'API_ADD_FOODADDON_INIT',
  payload: {
    ...payload,
    successActionType: 'API_GET_FOODADDONS_INIT'
  }
})

export const updateAddonPriceInit = (payload) => ({
  type: 'API_ADD_ADDONPRICE_INIT',
  payload: {
    ...payload,
    successActionType: 'API_GET_ADDONS_INIT'
  }
})

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const camel = (str) => capitalize(str.toLowerCase())

// Epic
const bootstrapEpic = (action$: Observable) =>
  action$.ofType('persist/REHYDRATE').mergeMap(() => {
    return Observable.fromPromise(API.GetLoggedRestaurant())
    .mergeMap((loggedUser) => {
      console.log(loggedUser,'x')
      return Observable.of(loggedFetchedAction(loggedUser), appBootstrap())
    })
    .catch(error => {
      console.log(error)
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') window.location.replace("/login")
      return Observable.of(appBootstrap())
    })
  })

export const signupDoneAction = (payload: object) => {
  console.log(payload)
  //window.location.replace('/')
  return { type: LOGIN_INIT, payload: { ...payload, crRest: true } }
}

export const signupFailAction = (err: Error) => ({ type: SIGNUP_FAIL, payload: err })

const registrationEpic = (action$: Observable, { getState }) =>
  action$
  .ofType(SIGNUP_INIT)
  .switchMap(({ payload: { name, phone, email, password, restaurantName, subdomain } }) => {
    const logged = getState().restaurant.loggedRestaurant
    if (!logged) { // register new user, log in, create new restaurant
      return Observable.fromPromise(API.RegisterUser({ name, phone, email, password }))
      .map(() => signupDoneAction({ email, password, name, subdomain }))
      .catch(error => Observable.of(signupFailAction(error)))
    } else { // create restaurant

    }
  })

export const loginFailAction = (err: Error) => ({ type: LOGIN_FAIL, payload: err })

export const FailAction = (err: Error) => ({ type: 'FAIL', payload: err })


export const loginDoneAction = (res: object) => {
  window.location.replace('/settings')
  return { type: LOGIN_DONE, payload: res }
}

const loginEpic = (action$: Observable, { getState }) =>
  action$
  .ofType(LOGIN_INIT)
  .switchMap(({ payload: { email, password, crRest, name, subdomain } }) => {
    return Observable.fromPromise(API.LoginUser({ email, password }))
    .map((res) => {
      setCookie('access_token', res.token, 30)
      if (crRest) {
        return { type: 'CREATE_RESTAURANT_INIT', payload: { name, subdomain, email, password } }
      } else {
        loginDoneAction(res)
      }
    })
    .catch(error => Observable.of(loginFailAction(error)))
  })

export const createRestaurantDoneAction = ({ email, password }) => {
  return { type: LOGIN_INIT, payload: { email, password } }
  //return { type: 'CREATE_RESTAURANT_DONE', payload: res }
}

const createRestaurantEpic = (action$: Observable, { getState }) =>
  action$
  .ofType('CREATE_RESTAURANT_INIT')
  .switchMap(({ payload: { name, subdomain, email, password } }) => {
    return Observable.fromPromise(API.CreateRestaurant({ name, subdomain }))
    .map(() => createRestaurantDoneAction({ email, password }))
    .catch(error => Observable.of(loginFailAction(error)))
  })

const updateEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.includes('UPDATE_') && action.type.includes('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('UPDATE_','').replace('_INIT','')
    return Observable
    .fromPromise(API[`Change${camel(subject)}`]({ restaurantId: getState().restaurant.loggedRestaurant.id, ...payload }))
    .map((res) => ({ type: `UPDATE_${subject}_DONE`, payload: res }))
    .catch(error => Observable.of({ type: `UPDATE_${subject}_FAIL`, payload: error }))
  })

const editImageEpic = (action$: Observable, { getState }) =>
  action$
  .ofType('UPDATE_IMAGE_DONE')
  .switchMap(({ payload: { id } }) => {
    const images = getState().restaurant.loggedRestaurant.images
    const maxPrecedence = R.sort((a,b) => b.precedence - a.precedence)(R.values(images))[0].precedence
    return Observable.fromPromise(API.EditImage({ id, precedence: maxPrecedence + 1 }))
    .map((res) => ({ type: `EDIT_IMAGE_DONE`, payload: res }))
    .catch(error => Observable.of({ type: `EDIT_IMAGE_FAIL`, payload: error }))
  })

const createWaiterboardEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .ofType(ADD_WB_INIT)
  .switchMap(({ payload: { name, login, password } }) =>
    Observable.fromPromise(API.CreateWaiterboard({
      name, login, password
    }))
    .map(createWaiterboardDoneAction)
    .catch(error => console.log(error))
  )
const getBillsEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .ofType(GET_BILLS_INIT)
  .switchMap(({ payload: { from, to } }) =>
    Observable.fromPromise(API.GetBills({
      from,
      to
    }))
      .map(getBillsDoneAction)
      .catch(error => console.log(error))
  )
const getCategoriesEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .ofType('GET_CATEGORIES_INIT')
  .switchMap(() =>
    Observable.fromPromise(API.GetCategories({
      restaurantId: getState().restaurant.loggedRestaurant.id
    }))
      .map(getCategoriesDoneAction)
      .catch(error => console.log(error))
  )
const rmCategoryEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .ofType('RM_CATEGORY_INIT')
  .switchMap(({ payload: { categoryId, enabled } }) =>
    Observable.fromPromise(API.ToggleCategory({ categoryId, enabled }))
      .map(getCategoriesInitAction)
      .catch(error => console.log(error))
  )
const addCategoryEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .ofType('ADD_CATEGORY_INIT')
  .switchMap(({ payload: { categoryName } }) =>
    Observable.fromPromise(API.AddCategory({
      restaurantId: getState().restaurant.loggedRestaurant.id,
      categoryName
    }))
      .map(getCategoriesInitAction)
      .catch(error => console.log(error))
  )
const rmFoodEpic = (action$: Observable) =>
  action$
  .ofType('RM_FOOD_INIT')
  .switchMap(({ payload: { foodId, enabled } }) =>
    Observable.fromPromise(API.ToggleFood({ foodId, enabled }))
      .map(getCategoriesInitAction)
      .catch(error => console.log(error))
  )

const updateFoodEpic = (action$: Observable) =>
  action$
  .ofType('UPDATE_FOOD_INIT')
  .switchMap(({ payload: { foodId, name, description, price } }) =>
    Observable.fromPromise(API.UpdateFood({ foodId, name, description, price }))
    .map(getCategoriesInitAction)
    .catch(error => Observable.of(console.log(error)))
  )

const addFoodEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .ofType('ADD_FOOD_INIT')
  .switchMap(({ payload: { categoryId, foodName } }) =>
    Observable.fromPromise(API.AddFood({
      categoryId,
      foodName
    }))
      .map(getCategoriesInitAction)
      .catch(error => console.log(error))
  )


const ActionEssence = (str) => camel(str.split('_')[2])



const apiGetEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.includes('API_GET') && action.type.includes('INIT'))
  .switchMap(({ type, payload }) => {
    const essence = ActionEssence(type)
    const doneActionType = type.replace('INIT', 'DONE')
    return Observable.fromPromise(API[`Get${essence}`](payload))
      .map((response) => ({ type: doneActionType, payload: {...payload, response} }))
      .catch(error => Observable.of(console.log(error)))
  })

const apiDoneAction = (doneActionType, payload, response) => ({ type: doneActionType, payload: {...payload, response} })
const apiCustomDoneAction = (type, payload) => {
  if (!type) return {type: 'NO_CUSTOM_DONEFC'}
  return { type, payload }
}

const apiRmEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.includes('API_RM') && action.type.includes('INIT'))
  .mergeMap(({ type, payload }) => {
    const essence = ActionEssence(type)
    const doneActionType = type.replace('INIT', 'DONE')
    return Observable.fromPromise(API[`Rm${essence}`](payload))
      .mergeMap((response) => Observable.of(
        apiDoneAction(doneActionType, payload, response),
        apiCustomDoneAction(payload.successActionType, payload)
      ))
      .catch(error => Observable.of(console.log(error)))
  })

const apiAddEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.includes('API_ADD') && action.type.includes('INIT'))
  .mergeMap(({ type, payload }) => {
    const essence = ActionEssence(type)
    const doneActionType = type.replace('INIT', 'DONE')
    return Observable.fromPromise(API[`Add${essence}`](payload))
      .mergeMap((response) => Observable.of(
        apiDoneAction(doneActionType, payload, response),
        apiCustomDoneAction(payload.successActionType, payload)
      ))
      .catch(error => Observable.of(console.log(error)))
  })

export const epics = [
  bootstrapEpic,
  loginEpic,
  registrationEpic,
  createRestaurantEpic,
  updateEpic,
  editImageEpic,
  createWaiterboardEpic,
  getBillsEpic,
  getCategoriesEpic,
  rmCategoryEpic,
  addCategoryEpic,
  rmFoodEpic,
  updateFoodEpic,
  addFoodEpic,
  apiGetEpic,
  apiRmEpic,
  apiAddEpic
]
