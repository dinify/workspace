import * as types from './types';

export const fetchAddons = payload => ({
  type: types.FETCH_RESTAURANTADDONS_INIT,
  payload
});

export const createAddonInit = payload => ({
  type: types.CREATE_ADDON_INIT,
  payload,
});

export const removeAddonInit = payload => ({
  type: types.REMOVE_ADDON_INIT,
  payload,
});
