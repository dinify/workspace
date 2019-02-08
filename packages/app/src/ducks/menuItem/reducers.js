// @flow
import R from 'ramda';
import * as FN from '@dinify/common/dist/lib/FN';
import types from './types';
import menuCategoryTypes from 'ducks/menuCategory/types';

const initialState = {
  all: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MENUITEMS_DONE: {
      const items = action.payload.res;
      let newState = R.assoc('all', {})(state);
      FN.MapToList(items).forEach(item => {
        if (item.published) newState = R.assocPath(['all', item.id], item)(newState);
      });
      return newState;
    }
    case types.FETCH_MENUITEM_DONE: {
      const item = action.payload.res;
      return R.assocPath(['all', item.id], item)(state);
    }
    case menuCategoryTypes.FETCH_MENUCATEGORIES_DONE: {
      const categories = action.payload.res;
      let newState = R.assoc('all', {})(state);
      categories.forEach((category) => {
        if (!category.items) return;
        FN.MapToList(category.items).forEach(item => {
          if (item.published) newState = R.assocPath(['all', item.id], item)(newState);
        });
      })
      return newState;
    }
    case types.FAV_MENUITEM_INIT: {
      const { id, fav } = action.payload;
      return R.assocPath(['all', id, 'favorite'], fav)(state);
    }
    case types.FAV_MENUITEM_DONE: {
      const { id, fav } = action.payload.prePayload;
      return R.assocPath(['all', id, 'favorite'], fav)(state);
    }
    case types.FAV_MENUITEM_FAIL: {
      const { id, fav } = action.payload.prePayload;
      return R.assocPath(['all', id, 'favorite'], !fav)(state);
    }
    case types.EXCLUDE_INGREDIENT: {
      const { menuItemId, ingredientId, excluded } = action.payload;
      return R.assocPath([
        'all',
        menuItemId,
        'ingredients',
        ingredientId,
        'excluded'
      ], excluded)(state);
    }
    case types.INC_ADDON_QTY: {
      const { menuItemId, addonId, inc } = action.payload;
      let preQty = state.all[menuItemId].addons[addonId].qty;
      if (!preQty) preQty = 0;
      return R.assocPath([
        'all',
        menuItemId,
        'addons',
        addonId,
        'qty'
      ], preQty + inc)(state);
    }
    case types.SELECT_CHOICE: {
      const { menuItemId, optionId, choiceId } = action.payload;
      let newState = state;
      R.keys(state.all[menuItemId].options[optionId].choices).forEach((chId) => {
        newState = R.assocPath([
          'all', menuItemId, 'options', optionId, 'choices', chId, 'selected'
        ], chId === choiceId)(newState);
      })
      return newState;
    }
    default:
      return state;
  }
}
