import * as types from './types';

export const fetchIngredients = payload => ({
  type: types.FETCH_RESTAURANTINGREDIENTS_INIT,
  payload
});

export const createIngredientFail = ({ message }) => ({
  type: types.CREATE_INGREDIENT_FAIL,
  payload: { message },  
})

export const createIngredientInit = ({ name, form }) => {
  if (!name || name.length <= 2) {
    return createIngredientFail({ message: 'Must be longer than 2 characters' });
  }
  if (name.length >= 50) {
    return createIngredientFail({ message: 'Must be shorter than 50 characters' });
  }
  return { type: types.CREATE_INGREDIENT_INIT, payload: { name, form } };
};

export const removeIngredientInit = payload => ({
  type: types.REMOVE_INGREDIENT_INIT,
  payload,
});

export const updateIngredientInit = payload => ({
  type: types.UPDATE_INGREDIENT_INIT,
  payload,
});
