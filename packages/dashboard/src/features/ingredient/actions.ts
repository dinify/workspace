import {
  createAsyncAction
} from 'typesafe-actions';
import * as types from './types';

const p = 'dinify/ingredient';

export const fetchIngredientsAsync = createAsyncAction(
  `${p}/GET_INGREDIENTS_INIT`,
  `${p}/GET_INGREDIENTS_DONE`,
  `${p}/GET_INGREDIENTS_FAIL`
)();

export const createIngredientAsync = createAsyncAction(
  `${p}/POST_INGREDIENT_INIT`,
  `${p}/POST_INGREDIENT_DONE`,
  `${p}/POST_INGREDIENT_FAIL`
)();

export const removeIngredientInit = (payload: any) => ({
  type: types.REMOVE_INGREDIENT_INIT,
  payload,
});

export const updateIngredientInit = (payload: any) => ({
  type: types.UPDATE_INGREDIENT_INIT,
  payload,
});
