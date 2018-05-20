// @flow

export const createIngredientInit = (payload) => ({
  type: 'CREATE_INGREDIENT_INIT', payload
})

export const removeIngredientInit = (payload) => ({
  type: 'REMOVE_INGREDIENT_INIT', payload
})

export const updateIngredientInit = (payload) => ({
  type: 'UPDATE_INGREDIENT_INIT', payload
})
