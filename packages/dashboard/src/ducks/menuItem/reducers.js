import pipe from 'ramda/src/pipe';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import { MapToList } from '@dinify/common/dist/lib/FN';
import * as restaurantTypes from 'ducks/restaurant/types';
import * as menuCategoryTypes from 'ducks/menuCategory/types';
import * as types from './types';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case restaurantTypes.FETCH_RESTAURANT_DONE: {
      const categories = payload.res.categories;
      let newState = state;
      MapToList(categories).forEach(category => {
        if (!category.items) return;
        MapToList(category.items).forEach(item => {
          newState = assocPath(['all', item.id], item)(newState);
        });
      });
      return newState;
    }
    
    case menuCategoryTypes.FETCH_MENUCATEGORIES_DONE: {
      const categories = payload.res;
      let newState = state;
      MapToList(categories).forEach(category => {
        if (!category.items) return;
        MapToList(category.items).forEach(item => {
          newState = assocPath(['all', item.id], item)(newState);
        });
      });
      return newState;
    }

    case types.CREATE_MENUITEM_DONE: {
      const newItem = payload.res;
      return assocPath(['all', newItem.id], newItem)(state);
    }

    case types.UPDATE_MENUITEM_INIT: {
      const { id, ingredients, options, addons } = payload;
      const original = state.all[id];
      if (ingredients || options || addons) return state;
      return assocPath(['all', payload.id], { ...original, ...payload })(state);
    }

    case types.REMOVE_MENUITEM_INIT: {
      const { id } = payload;
      return pipe(
        assocPath(['backup', id], state.all[id]),
        dissocPath(['all', id])
      )
    }

    case type.REMOVE_MENUITEM_FAIL: {
      const id = payload.initPayload.id;
      return assocPath(['all', id], state.backup[id])(state);
    }

    case 'UPDATECUSOMIZATIONS_UPDATING': {
      const { id, custKey, updatedCusts } = payload;
      return assocPath(['all', id, custKey], updatedCusts)(state);
    }

    case 'ASSIGN_INGREDIENT-FOOD_INIT': {
      const { foodId, ingredientId, ingredient } = payload;
      if (!ingredient) return state;
      return assocPath(['all', foodId, 'ingredients', ingredientId], ingredient)(state);
    }

    case 'UNASSIGN_INGREDIENT-FOOD_INIT': {
      const { foodId, ingredientId } = payload;
      return dissocPath(['all', foodId, 'ingredients', ingredientId])(state);
    }

    case 'ASSIGN_ADDON-FOOD_INIT': {
      const { foodId, addonId, addon } = payload;
      if (!addon) return state;
      return assocPath(['all', foodId, 'addons', addonId], addon)(state);
    }

    case 'UNASSIGN_ADDON-FOOD_INIT': {
      const { foodId, addonId } = payload;
      return dissocPath(['all', foodId, 'addons', addonId])(state);
    }

    case 'ASSIGN_OPTION-FOOD_INIT': {
      const { foodId, optionId, option } = payload;
      if (!option) return state;
      return assocPath(['all', foodId, 'options', optionId], option)(state);
    }

    case 'UNASSIGN_OPTION-FOOD_INIT': {
      const { foodId, optionId } = payload;
      return dissocPath(['all', foodId, 'options', optionId])(state);
    }

    case types.UPDATE_ITEMIMAGE_DONE: {
      const foodId = payload.initPayload.id;
      const image = payload.res;
      return assocPath(['all', foodId, 'images', image.id], image)(state);
    }

    default:
      return state;
  }
}
