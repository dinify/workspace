// @flow

export const createIngredientInit = ({ name }) => {
  if (!name || name.length <= 2) {
    return { type: 'CREATE_INGREDIENT_FAIL', payload: {
      message: 'Must be longer than 2 characters'
    } }
  }
  if (name.length >= 50) {
    return { type: 'CREATE_INGREDIENT_FAIL', payload: {
      message: 'Must be shorter than 50 characters'
    }}
  }
  return { type: 'CREATE_INGREDIENT_INIT', payload: { name } }
}

export const removeIngredientInit = (payload) => ({
  type: 'REMOVE_INGREDIENT_INIT', payload
})

export const updateIngredientInit = (payload) => ({
  type: 'UPDATE_INGREDIENT_INIT', payload
})
