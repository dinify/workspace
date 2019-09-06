import assocPath from 'ramda/src/assocPath';
import keys from 'ramda/src/keys';
import { MapToList, useOldPropsIfNewNA } from '@dinify/common/dist/lib/FN';
import menuCategoryTypes from 'ducks/menuCategory/types';
import types from './types';
import { getType } from 'typesafe-actions';
import * as cartActions from '../cart/actions.ts';


const initialState = {
  all: {},
};

const keepProps = ['ingredients', 'addons', 'options', 'favorite'];

export default function reducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {

    // case types.FETCH_MENUITEMS_DONE: {
    //   const items = action.payload.res;
    //   let newState = state;
    //   FN.MapToList(items).forEach(item => {
    //     if (item.published) newState = assocPath(['all', item.id], item)(newState);
    //   });
    //   return newState;
    // }

    case types.FETCH_MENUITEM_DONE: {
      const item = payload.res || {};
      return assocPath(['all', item.id], useOldPropsIfNewNA(state.all[item.id], item, keepProps))(state);
    }

    case getType(cartActions.fetchCartAsync.success): {
      const menuItems = action.payload.entities.menuItems;
      return { ...state.all, ...menuItems };
    }

    case menuCategoryTypes.FETCH_MENUCATEGORIES_DONE: {
      const categories = payload.res;
      let newState = state;
      categories.forEach((category) => {
        if (!category.items) return;
        MapToList(category.items).forEach(item => {
          if (item.published) {
            const updatedItem = useOldPropsIfNewNA(state.all[item.id], item, keepProps);
            newState = assocPath(['all', item.id], updatedItem)(newState);
          }
        });
      })
      return newState;
    }

    case types.FAV_MENUITEM_INIT: {
      const { id, fav } = payload;
      return assocPath(['all', id, 'favorite'], fav)(state);
    }
    case types.FAV_MENUITEM_DONE: {
      const { id, fav } = payload.initPayload;
      return assocPath(['all', id, 'favorite'], fav)(state);
    }
    case types.FAV_MENUITEM_FAIL: {
      const { id, fav } = payload.initPayload;
      return assocPath(['all', id, 'favorite'], !fav)(state);
    }
    case types.EXCLUDE_INGREDIENT: {
      const { menuItemId, ingredientId, excluded } = payload;
      return assocPath([
        'all',
        menuItemId,
        'ingredients',
        ingredientId,
        'excluded'
      ], excluded)(state);
    }
    case types.INC_ADDON_QTY: {
      const { menuItemId, addonId, inc } = payload;
      let preQty = state.all[menuItemId].addons[addonId].qty;
      if (!preQty) preQty = 0;
      return assocPath([
        'all',
        menuItemId,
        'addons',
        addonId,
        'qty'
      ], preQty + inc)(state);
    }

    case types.SELECT_CHOICE: {
      const { menuItemId, optionId, choiceId } = payload;
      let newState = state;
      keys(state.all[menuItemId].options[optionId].choices).forEach((chId) => {
        newState = assocPath([
          'all', menuItemId, 'options', optionId, 'choices', chId, 'selected'
        ], chId === choiceId)(newState);
      })
      return newState;
    }

    default:
      return state;
  }
}
