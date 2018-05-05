// @flow
import { Observable } from 'rxjs'
import R from 'ramda'
import * as FN from '../lib/FN'

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
export const updateMenuCategoryInitAction = (payload) => ({ type: 'UPDATE_MENUCATEGORY_INIT', payload })

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

export const createWaiterboardInitAction = (payload) => ({ type: 'CREATE_WAITERBOARD_INIT', payload })
export const deleteWaiterboardInitAction = (payload) => ({type: 'REMOVE_WAITERBOARD_INIT', payload})

export const createTableInitAction = (payload) => ({ type: 'CREATE_TABLE_INIT', payload })
export const updateTableInitAction = (payload) => ({ type: 'UPDATE_TABLE_INIT', payload })
export const deleteTableInitAction = (payload) => ({ type: 'REMOVE_TABLE_INIT', payload })

export const getBillsInitAction = (payload) => ({ type: GET_BILLS_INIT, payload })
export const getBillsDoneAction = (payload) => ({ type: GET_BILLS_DONE, payload })
export const getCategoriesInitAction = () => ({ type: 'GET_CATEGORIES_INIT' })
export const getCategoriesDoneAction = (payload) => ({ type: GET_CATEGORIES_DONE, payload })
export const rmCategoryInitAction = (payload) => ({ type: 'RM_CATEGORY_INIT', payload })
export const addCategoryInitAction = (payload) => ({ type: 'CREATE_CATEGORY_INIT', payload })
export const rmFoodInitAction = (payload) => ({ type: 'RM_FOOD_INIT', payload })

export const addFoodInitAction = (payload) => ({ type: 'CREATE_FOOD_INIT', payload })

export const updateFoodInitAction = (payload) => ({ type: 'UPDATE_FOOD_INIT', payload })
export const uploadMainImageInitAction = (payload) => ({ type: 'UPDATE_IMAGE_INIT', payload })
export const uploadItemImageInitAction = (payload) => ({ type: 'UPDATE_ITEMIMAGE_INIT', payload })

export const updateFoodNutritionInit = (payload) => ({ type: 'UPDATE_NUTRITION_INIT', payload })

export const addDayToBusinessHours = (payload) => ({ type: 'ADD_DAY_TO_BUSINESSHOURS', payload })
export const addRangeToBusinessHours = (payload) => ({ type: 'ADD_RANGE_TO_BUSINESSHOURS', payload })

export const reorderCategoriesAction = (payload) => ({ type: 'REORDER_MENUCATEGORY_INIT', payload })

export const getFoodOptionsInit = (payload) => ({ type: 'API_GET_FOODOPTIONS_INIT', payload })
export const rmFoodOptionInit = (payload) => ({
  type: 'API_RM_FOODOPTION_INIT',
  payload: {...payload,successActionType: 'API_GET_FOODOPTIONS_INIT'}
})
export const addOptionInit = (payload) => ({
  type: 'API_ADD_OPTION_INIT',
  payload: {...payload,successActionType: 'GET_LOGGED_INIT'}
})
export const addIngredientInit = (payload) => ({
  type: 'API_ADD_INGREDIENT_INIT',
  payload: {...payload,successActionType: 'GET_LOGGED_INIT'}
})

export const addAddonInit = (payload) => ({
  type: 'API_ADD_ADDON_INIT',
  payload: {...payload,successActionType: 'GET_LOGGED_INIT'}
})

export const assignIngredientInit = (payload) => ({ type: 'ASSIGN_INGREDIENT-FOOD_INIT', payload })
export const unassignIngredientInit = (payload) => ({ type: 'UNASSIGN_INGREDIENT-FOOD_INIT', payload })

export const assignAddonInit = (payload) => ({ type: 'ASSIGN_ADDON-FOOD_INIT', payload })
export const unassignAddonInit = (payload) => ({ type: 'UNASSIGN_ADDON-FOOD_INIT', payload })

export const assignOptionInit = (payload) => ({ type: 'ASSIGN_OPTION-FOOD_INIT', payload })
export const unassignOptionInit = (payload) => ({ type: 'UNASSIGN_OPTION-FOOD_INIT', payload })

export const getFoodAddonsInit = (payload) => ({ type: 'API_GET_FOODADDONS_INIT', payload })

export const rmFoodAddonInit = (payload) => ({
  type: 'API_RM_FOODADDON_INIT',
  payload: {...payload,successActionType: 'API_GET_FOODADDONS_INIT'}
})
export const addFoodAddonInit = (payload) => ({
  type: 'API_ADD_FOODADDON_INIT',
  payload: {...payload,successActionType: 'API_GET_FOODADDONS_INIT'}
})

export const updateAddonPriceInit = (payload) => ({
  type: 'API_ADD_ADDONPRICE_INIT',
  payload: {...payload,successActionType: 'GET_LOGGED_INIT'}
})

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const camel = (str) => capitalize(str.toLowerCase())

// Epic
const bootstrapEpic = (action$: Observable) =>
  action$.ofType('persist/REHYDRATE').mergeMap(() => {
    return Observable.fromPromise(API.GetLoggedRestaurant())
    .mergeMap((loggedUser) => {
      return Observable.of(loggedFetchedAction(loggedUser), appBootstrap())
    })
    .catch(error => {
      console.log(error)
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') window.location.replace("/login")
      return Observable.of(appBootstrap())
    })
  })

const getLoggedEpic = (action$: Observable) =>
  action$.ofType('GET_LOGGED_INIT')
  .switchMap(() =>
    Observable.fromPromise(API.GetLoggedRestaurant())
      .map((loggedUser) => loggedFetchedAction(loggedUser))
      .catch(error => {
        console.log(error)
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') window.location.replace("/login")
        return Observable.of(appBootstrap())
      })
  )

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
        return { type: 'REGISTER_RESTAURANT_INIT', payload: { name, subdomain, email, password } }
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

const registerRestaurantEpic = (action$: Observable, { getState }) =>
  action$
  .ofType('REGISTER_RESTAURANT_INIT')
  .switchMap(({ payload: { name, subdomain, email, password } }) => {
    return Observable.fromPromise(API.CreateRestaurant({ name, subdomain }))
    .map(() => createRestaurantDoneAction({ email, password }))
    .catch(error => Observable.of(loginFailAction(error)))
  })


// CRUD Epics
const fetchEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('FETCH_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('FETCH_','').replace('_INIT','')
    const apiFnName = `Get${camel(subject)}`
    return Observable
    .fromPromise(API[apiFnName]({
      restaurantId: getState().restaurant.loggedRestaurant.id,
      ...payload
    }))
    .map((res) => ({ type: `FETCH_${subject}_DONE`, payload: { res, prePayload: payload } }))
    .catch(error => Observable.of({ type: `FETCH_${subject}_FAIL`, payload: error }))
  })

const createEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('CREATE_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('CREATE_','').replace('_INIT','')
    const apiFnName = `Create${camel(subject)}`
    return Observable
    .fromPromise(API[apiFnName]({
      restaurantId: getState().restaurant.loggedRestaurant.id,
      ...payload
    }))
    .map((res) => ({ type: `CREATE_${subject}_DONE`, payload: { res, prePayload: payload } }))
    .catch(error => Observable.of({ type: `CREATE_${subject}_FAIL`, payload: error }))
  })

const updateEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('UPDATE_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('UPDATE_','').replace('_INIT','')
    const apiFnName = `Change${camel(subject)}`
    return Observable
    .fromPromise(API[apiFnName]({
      restaurantId: getState().restaurant.loggedRestaurant.id,
      ...payload
    }))
    .map((res) => ({ type: `UPDATE_${subject}_DONE`, payload: { res, prePayload: payload } }))
    .catch(error => Observable.of({ type: `UPDATE_${subject}_FAIL`, payload: error }))
  })

const removeEpic = (action$: Observable, { getState }: EpicDependencies) =>
  action$
  .filter(action => action.type.startsWith('REMOVE_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {
    const subject = type.replace('REMOVE_','').replace('_INIT','')
    const apiFnName = `Delete${camel(subject)}`
    return Observable
    .fromPromise(API[apiFnName]({
      restaurantId: getState().restaurant.loggedRestaurant.id,
      ...payload
    }))
    .map(() => ({ type: `REMOVE_${subject}_DONE`, payload }))
    .catch(error => Observable.of({ type: `REMOVE_${subject}_FAIL`, payload: error }))
  })




const assignEpic = (action$: Observable) =>
  action$
  .filter(action => action.type.startsWith('ASSIGN_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {

    const middle = type.split('_')[1] // INGREDIENT-FOOD
    const assignTo = middle.split('-')[1] // FOOD

    const originalObjectKey = R.keys(payload.originalObject)[0] // 'ingredients'
    const originalObject = payload.originalObject[originalObjectKey] // map of ingredients

    const singular = originalObjectKey.slice(0, -1) // 'ingredient'
    const assignedEntity = payload[singular] // object of ingredient

    const newObject = R.assoc(assignedEntity.id, assignedEntity)(originalObject) // original with new entity

    let updatePayload = {}
    updatePayload[originalObjectKey] = FN.MapToList(newObject)
    updatePayload[`${assignTo.toLowerCase()}Id`] = payload[`${assignTo.toLowerCase()}Id`] // foodId

    return Observable.of({
      type: `UPDATE_${assignTo}_INIT`,
      payload: updatePayload
    })
  })


const unassignEpic = (action$: Observable) =>
  action$
  .filter(action => action.type.startsWith('UNASSIGN_') && action.type.endsWith('_INIT'))
  .switchMap(({ payload, type }) => {

    const middle = type.split('_')[1] // INGREDIENT-FOOD
    const assignTo = middle.split('-')[1] // FOOD

    const originalObjectKey = R.keys(payload.originalObject)[0] // 'ingredients'
    const originalObject = payload.originalObject[originalObjectKey] // map of ingredients

    const singular = originalObjectKey.slice(0, -1) // 'ingredient'
    console.log(originalObject);
    console.log(payload[`${singular}Id`]);
    const newObject = R.dissoc(payload[`${singular}Id`])(originalObject) // original without entity with entityId

    let updatePayload = {}
    updatePayload[originalObjectKey] = FN.MapToList(newObject)
    updatePayload[`${assignTo.toLowerCase()}Id`] = payload[`${assignTo.toLowerCase()}Id`] // foodId

    return Observable.of({
      type: `UPDATE_${assignTo}_INIT`,
      payload: updatePayload
    })
  })


const reorderEpic = (action$: Observable) =>
  action$
  .filter(action => action.type.startsWith('REORDER_') && action.type.endsWith('_INIT'))
  .mergeMap(({ payload, type }) => {

    const middle = type.split('_')[1] // 'CATEGORY'

    return payload.map((o, i) => ({
      type: `UPDATE_${middle}_INIT`,
      payload: {
        id: o.id,
        precedence: i
      }
    })).concat({
      type: `REORDER_${middle}_DONE`
    })

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
      .map(() => ({type: 'GET_LOGGED_INIT'}))
      .catch(error => console.log(error))
  )

const rmFoodEpic = (action$: Observable) =>
  action$
  .ofType('RM_FOOD_INIT')
  .switchMap(({ payload: { foodId, enabled } }) =>
    Observable.fromPromise(API.ToggleFood({ foodId, enabled }))
      .map(() => ({type: 'GET_LOGGED_INIT'}))
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
  getLoggedEpic,
  loginEpic,
  registrationEpic,
  registerRestaurantEpic,
  createEpic,
  updateEpic,
  removeEpic,
  assignEpic,
  unassignEpic,
  reorderEpic,
  editImageEpic,
  getBillsEpic,
  getCategoriesEpic,
  rmCategoryEpic,
  rmFoodEpic,
  apiGetEpic,
  apiRmEpic,
  apiAddEpic
]
