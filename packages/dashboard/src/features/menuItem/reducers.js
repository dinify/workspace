import pipe from 'ramda/es/pipe';
import assoc from 'ramda/es/assoc';
import assocPath from 'ramda/es/assocPath';
import dissocPath from 'ramda/es/dissocPath';
import uniq from 'ramda/es/uniq';
import { actionTypes as firebaseTypes } from 'react-redux-firebase';
import { getType } from 'typesafe-actions';
import { fetchMenuCategoriesAsync } from '../menuCategory/actions';
import * as types from './types';
import {
  fetchMenuItemAsync,
  createMenuItemAsync,
  assignIngredientAsync,
  unassignIngredientAsync,
  assignAddonAsync,
  unassignAddonAsync,
  assignOptionAsync,
  unassignOptionAsync,
  setIngredientExcludabilityAsync,
  updateMenuItemAsync,
  removeMenuItemAsync,
} from './actions';

const initialState = {
  all: {},
  menuIngredients: {},
  backup: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action;

  switch (type) {

    case getType(fetchMenuCategoriesAsync.success): {
      const items = payload.entities.menuItems;
      return assoc('all', { ...state.all, ...items })(state);
    }

    case getType(fetchMenuItemAsync.success): {
      const { menuItems, menuIngredients } = payload.entities;
      return pipe(
        assoc('all', { ...state.all, ...menuItems }),
        assoc('menuIngredients', { ...state.menuIngredients, ...menuIngredients})
      )(state);
    }

    case getType(updateMenuItemAsync.success): {
      const { menuItemId } = meta;
      return assocPath(['all', menuItemId], { ...state.all[menuItemId], ...meta })(state);
    }    

    case getType(createMenuItemAsync.success): {
      const newItem = payload;
      return assocPath(['all', newItem.id], newItem)(state);
    }

    case getType(removeMenuItemAsync.success): {
      const { menuItemId } = meta;
      return dissocPath(['all', menuItemId])(state);
    }

    case getType(setIngredientExcludabilityAsync.success): {
      const { menuItemId, ingredientId, excludable } = payload;
      const compoundId = `${menuItemId}.${ingredientId}`;
      return assocPath(['menuIngredients', compoundId, 'excludable'], excludable)(state);
    }

    case getType(assignIngredientAsync.request): {
      const { menuItemId, ingredientId } = payload;
      const compoundId = `${menuItemId}.${ingredientId}`;
      return assocPath(
        ['all', menuItemId, 'menuIngredients'],
        uniq([...state.all[menuItemId].menuIngredients, compoundId]),
      )(state);
    }

    case getType(unassignIngredientAsync.request): {
      const { menuItemId, ingredientId } = payload;
      const compoundId = `${menuItemId}.${ingredientId}`;
      return assocPath(
        ['all', menuItemId, 'menuIngredients'],
        state.all[menuItemId].menuIngredients.filter(id => id !== compoundId),
      )(state);
    }

    case getType(assignAddonAsync.request): {
      const { menuItemId, addonId } = payload;
      const compoundId = `${menuItemId}.${addonId}`;
      return assocPath(
        ['all', menuItemId, 'menuAddons'],
        uniq([...state.all[menuItemId].menuAddons, compoundId]),
      )(state);
    }

    case getType(unassignAddonAsync.request): {
      const { menuItemId, addonId } = payload;
      const compoundId = `${menuItemId}.${addonId}`;
      return assocPath(
        ['all', menuItemId, 'menuAddons'],
        state.all[menuItemId].menuAddons.filter(id => id !== compoundId),
      )(state);
    }

    case getType(assignOptionAsync.request): {
      const { menuItemId, optionId } = payload;
      const compoundId = `${menuItemId}.${optionId}`;
      return assocPath(
        ['all', menuItemId, 'menuOptions'],
        uniq([...state.all[menuItemId].menuOptions, compoundId]),
      )(state);
    }

    case getType(unassignOptionAsync.request): {
      const { menuItemId, optionId } = payload;
      const compoundId = `${menuItemId}.${optionId}`;
      return assocPath(
        ['all', menuItemId, 'menuOptions'],
        state.all[menuItemId].menuOptions.filter(id => id !== compoundId),
      )(state);
    }

    case types.UPDATE_ITEMIMAGE_DONE: {
      const foodId = payload.initPayload.id;
      const image = payload.res;
      return assocPath(['all', foodId, 'images', image.id], image)(state);
    }
    
    case firebaseTypes.LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
}
