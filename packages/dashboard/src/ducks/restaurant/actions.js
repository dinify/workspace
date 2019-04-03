// @flow

// Action Creators
export const selectCategoryAction = payload => ({
    type: 'SELECT_CATEGORY',
    payload,
  });

export const registerRestaurant = payload => ({
  type: 'REGISTER_RESTAURANT_INIT',
  payload
})

export const prefillEmail = payload => ({ type: 'PREFILL_EMAIL', payload });
export const prefillRestaurantName = payload => ({ type: 'PREFILL_RESTAURANTNAME', payload });
export const setOngoingRegistration = payload => ({ type: 'SET_ONGOINGREGISTRATION', payload })

export const selectFoodAction = payload => ({ type: 'SELECT_FOOD', payload });
export const updateNameInitAction = payload => ({
  type: 'UPDATE_NAME_INIT',
  payload,
});
export const updateDoneAction = () => ({ type: 'UPDATE_DONE' });

export const updateCategoryInitAction = payload => ({
  type: 'UPDATE_CATEGORY_INIT',
  payload,
});

export const updateContactInitAction = payload => ({
  type: 'UPDATE_CONTACT_INIT',
  payload,
});
export const updateSocialInitAction = payload => ({
  type: 'UPDATE_SOCIAL_INIT',
  payload,
});
export const updateLocationInitAction = payload => ({
  type: 'UPDATE_LOCATION_INIT',
  payload,
});
export const updateBankInitAction = payload => ({
  type: 'UPDATE_BANK_INIT',
  payload,
});
export const updateAddressInitAction = payload => ({
  type: 'UPDATE_ADDRESS_INIT',
  payload,
});

export const updateHoursInitAction = payload => ({
  type: 'UPDATE_HOURS_INIT',
  payload,
});

export const loggedFetchedAction = payload => ({
  type: 'LOGGED_FETCHED_DONE',
  payload,
});
export const signupInitAction = payload => ({ type: 'SIGNUP_INIT', payload });

export const appBootstrap = () => ({ type: 'BOOTSTRAP' });

export const createWaiterboardInitAction = payload => ({
  type: 'CREATE_WAITERBOARD_INIT',
  payload,
});
export const deleteWaiterboardInitAction = payload => ({
  type: 'REMOVE_WAITERBOARD_INIT',
  payload,
});

export const createTableInitAction = payload => ({
  type: 'CREATE_TABLE_INIT',
  payload,
});
export const updateTableInitAction = payload => ({
  type: 'UPDATE_TABLE_INIT',
  payload,
});
export const deleteTableInitAction = payload => ({
  type: 'REMOVE_TABLE_INIT',
  payload,
});

export const getBillsInitAction = payload => ({
  type: 'GET_BILLS_INIT',
  payload,
});
export const getBillsDoneAction = payload => ({
  type: 'GET_BILLS_DONE',
  payload,
});
export const getCategoriesInitAction = () => ({ type: 'GET_CATEGORIES_INIT' });
export const getCategoriesDoneAction = payload => ({
  type: 'GET_CATEGORIES_DONE',
  payload,
});
export const rmCategoryInitAction = payload => ({
  type: 'RM_CATEGORY_INIT',
  payload,
});

export const createMenucategoryInitAction = payload => ({
  type: 'CREATE_MENUCATEGORY_INIT',
  payload,
});
export const updateMenucategoryInitAction = payload => ({
  type: 'UPDATE_MENUCATEGORY_INIT',
  payload,
});
export const deleteMenucategoryInitAction = payload => ({
  type: 'REMOVE_MENUCATEGORY_INIT',
  payload,
});
export const reorderCategoriesAction = payload => ({
  type: 'REORDER_MENUCATEGORY_INIT',
  payload,
});

export const createMenuitemInitAction = payload => ({
  type: 'CREATE_MENUITEM_INIT',
  payload,
});
export const updateMenuitemInitAction = payload => ({
  type: 'UPDATE_MENUITEM_INIT',
  payload,
});
export const deleteMenuitemInitAction = payload => ({
  type: 'REMOVE_MENUITEM_INIT',
  payload,
});
export const reorderItemsAction = payload => ({
  type: 'REORDER_MENUITEM_INIT',
  payload,
});

export const rmFoodInitAction = payload => ({ type: 'RM_FOOD_INIT', payload });

export const addFoodInitAction = payload => ({
  type: 'CREATE_FOOD_INIT',
  payload,
});

export const updateFoodInitAction = payload => ({
  type: 'UPDATE_MENUITEM_INIT',
  payload,
});
export const uploadMainImageInitAction = payload => ({
  type: 'UPDATE_IMAGE_INIT',
  payload,
});
export const uploadItemImageInitAction = payload => ({
  type: 'UPDATE_ITEMIMAGE_INIT',
  payload,
});

export const updateFoodNutritionInit = payload => ({
  type: 'UPDATE_NUTRITION_INIT',
  payload,
});

export const addDayToBusinessHours = payload => ({
  type: 'ADD_DAY_TO_BUSINESSHOURS',
  payload,
});
export const addRangeToBusinessHours = payload => ({
  type: 'ADD_RANGE_TO_BUSINESSHOURS',
  payload,
});

export const createAddonInit = payload => ({
  type: 'CREATE_ADDON_INIT',
  payload,
});
export const createIngredientInit = payload => ({
  type: 'CREATE_INGREDIENT_INIT',
  payload,
});
export const createOptionInit = payload => ({
  type: 'CREATE_OPTION_INIT',
  payload,
});

export const updateAddonInit = payload => ({
  type: 'UPDATE_ADDON_INIT',
  payload,
});

export const selectRestaurant = payload => ({ type: 'SELECT_RESTAURANT', payload });
