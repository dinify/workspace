import {
  createAsyncAction
} from 'typesafe-actions';

const p = 'dinify/ingredient';

export const fetchIngredientsAsync = createAsyncAction(
  `${p}/GET_INGREDIENTS_INIT`,
  `${p}/GET_INGREDIENTS_DONE`,
  `${p}/GET_INGREDIENTS_FAIL`
)<any, any, any>();

export const createIngredientAsync = createAsyncAction(
  `${p}/POST_INGREDIENT_INIT`,
  `${p}/POST_INGREDIENT_DONE`,
  `${p}/POST_INGREDIENT_FAIL`
)<any, any, any>();

export const removeIngredientAsync = createAsyncAction(
  `${p}/RM_INGREDIENT_INIT`,
  `${p}/RM_INGREDIENT_DONE`,
  `${p}/RM_INGREDIENT_FAIL`
)<any, any, any>();

export const updateIngredientAsync = createAsyncAction(
  `${p}/UPD_INGREDIENT_INIT`,
  `${p}/UPD_INGREDIENT_DONE`,
  `${p}/UPD_INGREDIENT_FAIL`
)<any, any, any>();
