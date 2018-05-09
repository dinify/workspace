// @flow
import { Observable } from 'rxjs'
import R from 'ramda'
import * as FN from 'lib/FN'

import * as API from 'api/restaurant'
import type { EpicDependencies, Error, Action } from '../flow'

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

export const updateContactInitAction = (payload) => ({ type: 'UPDATE_CONTACT_INIT', payload })
export const updateSocialInitAction = (payload) => ({ type: 'UPDATE_SOCIAL_INIT', payload })
export const updateLocationInitAction = (payload) => ({ type: 'UPDATE_LOCATION_INIT', payload })
export const updateBankInitAction = (payload) => ({ type: 'UPDATE_BANK_INIT', payload })
export const updateHoursInitAction = (payload) => ({ type: 'UPDATE_HOURS_INIT', payload })
export const loginInitAction = (payload) => ({ type: 'LOGIN_INIT', payload })
export const logoutInitAction = () => {
  setCookie('access_token', '', 1)
  window.location.replace('/login')
  return { type: 'LOGOUT_DONE' }
}
export const loggedFetchedAction = (payload) => ({ type: 'LOGGED_FETCHED_DONE', payload })
export const signupInitAction = (payload) => ({ type: 'SIGNUP_INIT', payload })

export const appBootstrap = () => ({ type: 'BOOTSTRAP' })

export const createWaiterboardInitAction = (payload) => ({ type: 'CREATE_WAITERBOARD_INIT', payload })
export const deleteWaiterboardInitAction = (payload) => ({type: 'REMOVE_WAITERBOARD_INIT', payload})

export const createTableInitAction = (payload) => ({ type: 'CREATE_TABLE_INIT', payload })
export const updateTableInitAction = (payload) => ({ type: 'UPDATE_TABLE_INIT', payload })
export const deleteTableInitAction = (payload) => ({ type: 'REMOVE_TABLE_INIT', payload })

export const getBillsInitAction = (payload) => ({ type: 'GET_BILLS_INIT', payload })
export const getBillsDoneAction = (payload) => ({ type: 'GET_BILLS_DONE', payload })
export const getCategoriesInitAction = () => ({ type: 'GET_CATEGORIES_INIT' })
export const getCategoriesDoneAction = (payload) => ({ type: 'GET_CATEGORIES_DONE', payload })
export const rmCategoryInitAction = (payload) => ({ type: 'RM_CATEGORY_INIT', payload })

export const createMenucategoryInitAction = (payload) => ({ type: 'CREATE_MENUCATEGORY_INIT', payload })
export const updateMenucategoryInitAction = (payload) => ({ type: 'UPDATE_MENUCATEGORY_INIT', payload })
export const deleteMenucategoryInitAction = (payload) => ({ type: 'REMOVE_MENUCATEGORY_INIT', payload })
export const reorderCategoriesAction = (payload) => ({ type: 'REORDER_MENUCATEGORY_INIT', payload })

export const createMenuitemInitAction = (payload) => ({ type: 'CREATE_MENUITEM_INIT', payload })
export const updateMenuitemInitAction = (payload) => ({ type: 'UPDATE_MENUITEM_INIT', payload })
export const deleteMenuitemInitAction = (payload) => ({ type: 'REMOVE_MENUITEM_INIT', payload })
export const reorderItemsAction = (payload) => ({ type: 'REORDER_MENUITEM_INIT', payload })

export const rmFoodInitAction = (payload) => ({ type: 'RM_FOOD_INIT', payload })

export const addFoodInitAction = (payload) => ({ type: 'CREATE_FOOD_INIT', payload })

export const updateFoodInitAction = (payload) => ({ type: 'UPDATE_MENUITEM_INIT', payload })
export const uploadMainImageInitAction = (payload) => ({ type: 'UPDATE_IMAGE_INIT', payload })
export const uploadItemImageInitAction = (payload) => ({ type: 'UPDATE_ITEMIMAGE_INIT', payload })

export const updateFoodNutritionInit = (payload) => ({ type: 'UPDATE_NUTRITION_INIT', payload })

export const addDayToBusinessHours = (payload) => ({ type: 'ADD_DAY_TO_BUSINESSHOURS', payload })
export const addRangeToBusinessHours = (payload) => ({ type: 'ADD_RANGE_TO_BUSINESSHOURS', payload })

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

export const assignIngredientInit = (payload) => ({ type: 'ASSIGN_INGREDIENT-MENUITEM_INIT', payload })
export const unassignIngredientInit = (payload) => ({ type: 'UNASSIGN_INGREDIENT-MENUITEM_INIT', payload })

export const assignAddonInit = (payload) => ({ type: 'ASSIGN_ADDON-MENUITEM_INIT', payload })
export const unassignAddonInit = (payload) => ({ type: 'UNASSIGN_ADDON-MENUITEM_INIT', payload })

export const assignOptionInit = (payload) => ({ type: 'ASSIGN_OPTION-MENUITEM_INIT', payload })
export const unassignOptionInit = (payload) => ({ type: 'UNASSIGN_OPTION-MENUITEM_INIT', payload })

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
