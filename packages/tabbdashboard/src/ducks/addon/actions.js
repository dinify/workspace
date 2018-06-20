// @flow

export const createAddonInit = payload => ({
  type: 'CREATE_ADDON_INIT',
  payload,
});

export const removeAddonInit = payload => ({
  type: 'REMOVE_ADDON_INIT',
  payload,
});
