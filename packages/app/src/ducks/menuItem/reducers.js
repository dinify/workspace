import assocPath from 'ramda/src/assocPath';
import keys from 'ramda/src/keys';
import pipe from 'ramda/src/pipe';
import { MapToList } from '@dinify/common/dist/lib/FN';
import menuCategoryTypes from 'ducks/menuCategory/types';
import types from './types';

const initialState = {
  all: {},
};

const handleProp = (oldItem, propName) => newItem => {
  const updatedItem = newItem;
  if (!updatedItem[propName] && oldItem[propName]) {
    updatedItem[propName] = oldItem[propName];
  }
  return updatedItem;
}

const updateMenuItem = (oldItem, newItem) => {
  const result = pipe(
    handleProp(oldItem, 'ingredients'),
    handleProp(oldItem, 'addons'),
    handleProp(oldItem, 'options')
  )(newItem);
  return result;
}


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
      return assocPath(['all', item.id], item)(state);
    }

    case menuCategoryTypes.FETCH_MENUCATEGORIES_DONE: {
      const categories = payload.res;
      let newState = state;
      categories.forEach((category) => {
        if (!category.items) return;
        MapToList(category.items).forEach(item => {
          if (item.published) {
            if (state.all[item.id]) {
              const updatedItem = updateMenuItem(state.all[item.id], item);
              newState = assocPath(['all', item.id], updatedItem)(newState);
            } else {
              newState = assocPath(['all', item.id], item)(newState);
            }
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
