import pipe from 'ramda/src/pipe';
import assocPath from 'ramda/src/assocPath';
import dissocPath from 'ramda/src/dissocPath';
import { MapToList } from '@dinify/common/dist/lib/FN';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'FETCH_LOGGEDRESTAURANT_DONE': {
      const categories = payload.res.categories;
      let newState = state;
      MapToList(categories).forEach(category => {
        if (!category.items) return;
        MapToList(category.items).forEach(item => {
          newState = assocPath(['all', item.id], item)(state);
        });
      });

      return newState;
    }
    
    case 'CREATE_MENUITEM_DONE': {
      const newItem = payload.res;
      return assocPath(['all', newItem.id], newItem)(state);
    }

    case 'UPDATECUSOMIZATIONS_UPDATING': {
      const { id, custKey, updatedCusts } = payload;
      return assocPath(['all', id, custKey], updatedCusts)(state);
    }

    case 'UPDATE_MENUITEM_INIT': {
      const { id, ingredients, options, addons } = payload;
      const original = state.all[id];
      if (ingredients || options || addons) return state;
      return assocPath(['all', payload.id], { ...original, ...payload })(state);
    }

    case 'REMOVE_MENUITEM_INIT': {
      const { id } = payload;
      return pipe(
        assocPath(['backup', id], state.all[id]),
        dissocPath(['all', id])
      )
    }

    case 'REMOVE_MENUITEM_FAIL': {
      const id = payload.prePayload.id;
      return assocPath(['all', id], state.backup[id])(state);
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

    case 'UPDATE_ITEMIMAGE_DONE': {
      const foodId = payload.prePayload.id;
      const image = payload.res;
      return assocPath(['all', foodId, 'images', image.id], image)(state);
    }

    default:
      return state;
  }
}
