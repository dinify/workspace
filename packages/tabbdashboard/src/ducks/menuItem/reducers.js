// @flow
import R from 'ramda';
import * as FN from 'lib/FN';

const initialState = {
  all: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGGED_FETCHED_DONE': {
      const categories = action.payload.categories;
      FN.MapToList(categories).forEach(category => {
        if (!category.items) return;
        FN.MapToList(category.items).forEach(item => {
          state = R.assocPath(['all', item.id], item)(state);
        });
      });
      return state;
    }

    case 'CREATE_MENUITEM_DONE': {
      const newItem = action.payload.res;
      return R.assocPath(['all', newItem.id], newItem)(state);
    }

    case 'UPDATECUSOMIZATIONS_UPDATING': {
      const { id, custKey, updatedCusts } = action.payload;
      return R.assocPath(['all', id, custKey], updatedCusts)(state);
    }

    case 'UPDATE_MENUITEM_INIT': {
      const payload = action.payload;
      const original = state.all[payload.id];
      if (payload.ingredients) return state;
      return R.assocPath(['all', payload.id], { ...original, ...payload })(
        state,
      );
    }

    case 'REMOVE_MENUITEM_INIT': {
      state = R.assocPath(
        ['backup', action.payload.id],
        state.all[action.payload.id],
      )(state);
      return R.dissocPath(['all', action.payload.id])(state);
    }

    case 'REMOVE_MENUITEM_FAIL': {
      const id = action.payload.prePayload.id;
      return R.assocPath(['all', id], state.backup[id])(state);
    }

    case 'ASSIGN_INGREDIENT-FOOD_INIT': {
      const { foodId, ingredientId, ingredient } = action.payload;
      if (!ingredient) return state;
      return R.assocPath(
        ['all', foodId, 'ingredients', ingredientId],
        ingredient,
      )(state);
    }
    case 'UNASSIGN_INGREDIENT-FOOD_INIT': {
      const { foodId, ingredientId } = action.payload;
      return R.dissocPath(['all', foodId, 'ingredients', ingredientId])(state);
    }

    case 'ASSIGN_ADDON-FOOD_INIT': {
      const { foodId, addonId, addon } = action.payload;
      if (!addon) return state;
      return R.assocPath(['all', foodId, 'addons', addonId], addon)(state);
    }
    case 'UNASSIGN_ADDON-FOOD_INIT': {
      const { foodId, addonId } = action.payload;
      return R.dissocPath(['all', foodId, 'addons', addonId])(state);
    }

    case 'ASSIGN_OPTION-FOOD_INIT': {
      const { foodId, optionId, option } = action.payload;
      if (!option) return state;
      return R.assocPath(['all', foodId, 'options', optionId], option)(state);
    }
    case 'UNASSIGN_OPTION-FOOD_INIT': {
      const { foodId, optionId } = action.payload;
      return R.dissocPath(['all', foodId, 'options', optionId])(state);
    }

    case 'UPDATE_ITEMIMAGE_DONE': {
      const foodId = action.payload.prePayload.id;
      const image = action.payload.res;
      return R.assocPath(['all', foodId, 'images', image.id], image)(state);
    }

    default:
      return state;
  }
}
