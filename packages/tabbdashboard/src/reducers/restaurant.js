// @flow
import R from 'ramda'
import * as FN from '../lib/FN'

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
  appRun: boolean,
  loggedRestaurant: ?Object,
}

const initialState = {
  appRun: false,
  loggedRestaurant: null,
  bills: [],
  categories: {},
  menuItems: {},
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
      const categories = action.payload.categories
      state = R.assoc('categories', categories)(state)
      FN.MapToList(categories).map((category) => {
        if (!category.items) return
        FN.MapToList(category.items).map((item) => {
          state = R.assocPath(['menuItems', item.id], item)(state)
        })
      })
      return R.assoc('loggedRestaurant', action.payload)(state)
    }
    case 'UPDATE_LOCATION_INIT':
      state = R.assocPath(['loggedRestaurant', 'longitude'], action.payload.longitude)(state)
      return R.assocPath(['loggedRestaurant', 'latitude'], action.payload.latitude)(state)
    case 'UPDATE_NAME_INIT':
      return R.assocPath(['loggedRestaurant', 'name'], action.payload.name)(state)
    case 'UPDATE_IMAGE_DONE':
      return R.assocPath(['loggedRestaurant', 'uploadedImage'], action.payload.res.url)(state)
    case 'UPDATE_CATEGORY_INIT':
      return R.assocPath(['loggedRestaurant', 'category'], action.payload.category)(state)
    case 'CREATE_CATEGORY_DONE': {
      const newCategory = action.payload.res
      return R.assocPath(['categories', newCategory.id], newCategory)(state)
    }
    case UPDATE_LOCATION_INIT: {
      state = R.assocPath(['loggedRestaurant', 'location', 'longitude'], Number(action.payload.longitude))(state)
      return R.assocPath(['loggedRestaurant', 'location', 'latitude'], Number(action.payload.latitude))(state)
    }
    case UPDATE_BANK_INIT: {
      return R.assocPath(['loggedRestaurant', 'bank'], action.payload)(state)
    }
    case ADD_WB_DONE:
      return R.assoc('addTabletDone', 'done')(state)
    case GET_BILLS_DONE:
      return R.assoc('bills', action.payload)(state)
    case GET_CATEGORIES_DONE:
      return R.assoc('categories', action.payload)(state)
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
      return R.assoc('addons', action.payload.response)(state)
    }
    case 'API_GET_ADDONS_DONE': {
      return R.assoc('addons', action.payload.response)(state)
    }
    case 'CREATE_WAITERBOARD_DONE': {
      const newWaiterboard = action.payload.res
      return R.assocPath(['loggedRestaurant', 'waiterboards', newWaiterboard.id], newWaiterboard)(state)
    }
    case 'REMOVE_WAITERBOARD_DONE': {
      return R.dissocPath(['loggedRestaurant', 'waiterboards', action.payload.id])(state)
    }
    case 'CREATE_TABLE_DONE': {
      const newTable = action.payload.res
      return R.assocPath(
        ['loggedRestaurant', 'waiterboards', newTable.waiterboard_id, 'tables', newTable.id],
        {
          ...newTable
        }
      )(state)
    }
    case 'REMOVE_TABLE_INIT': {
      return R.dissocPath(
        ['loggedRestaurant', 'waiterboards', action.payload.waiterboardId, 'tables', action.payload.id]
      )(state)
    }
    case 'UPDATE_TABLE_INIT': {
      const prePayload = action.payload
      state = R.assocPath(
        ['loggedRestaurant', 'waiterboards', prePayload.waiterboardId, 'tables', prePayload.id, 'x'],
        prePayload.x
      )(state)
      return R.assocPath(
        ['loggedRestaurant', 'waiterboards', prePayload.waiterboardId, 'tables', prePayload.id, 'y'],
        prePayload.y
      )(state)
    }
    case 'ADD_DAY_TO_BUSINESSHOURS': {
      return R.assocPath(['loggedRestaurant', 'open_hours'],
        R.assoc(action.payload.dayName,
          [['10:00', '22:00']]
        )(state.loggedRestaurant.open_hours)
      )(state)
    }
    case 'ADD_RANGE_TO_BUSINESSHOURS': {
      return R.assocPath(['loggedRestaurant', 'open_hours', action.payload.dayName],
        [...state.loggedRestaurant.open_hours[action.payload.dayName], [action.payload.from, '23:59']]
      )(state)
    }

    case 'ASSIGN_INGREDIENT-FOOD_INIT': {
      const { foodId, ingredientId, ingredient } = action.payload
      if (!ingredient) return state
      return R.assocPath(['menuItems', foodId, 'ingredients', ingredientId], ingredient)(state)
    }
    case 'UNASSIGN_INGREDIENT-FOOD_INIT': {
      const { foodId, ingredientId } = action.payload
      return R.dissocPath(['menuItems', foodId, 'ingredients', ingredientId])(state)
    }

    case 'ASSIGN_ADDON-FOOD_INIT': {
      const { foodId, addonId, addon } = action.payload
      if (!addon) return state
      return R.assocPath(['menuItems', foodId, 'addons', addonId], addon)(state)
    }
    case 'UNASSIGN_ADDON-FOOD_INIT': {
      const { foodId, addonId } = action.payload
      return R.dissocPath(['menuItems', foodId, 'addons', addonId])(state)
    }

    case 'ASSIGN_OPTION-FOOD_INIT': {
      const { foodId, optionId, option } = action.payload
      if (!option) return state
      return R.assocPath(['menuItems', foodId, 'options', optionId], option)(state)
    }
    case 'UNASSIGN_OPTION-FOOD_INIT': {
      const { foodId, optionId } = action.payload
      return R.dissocPath(['menuItems', foodId, 'options', optionId])(state)
    }

    case 'CREATE_FOOD_DONE': {
      const response = action.payload.res
      if (!response) return state
      return R.assocPath(['menuItems', response.id], response)(state)
    }
    default:
      return state
  }
}
