import {
  createAsyncAction
} from 'typesafe-actions';

const p = 'dinify/addon';

export const fetchAddonsAsync = createAsyncAction(
  `${p}/GET_ADDONS_INIT`,
  `${p}/GET_ADDONS_DONE`,
  `${p}/GET_ADDONS_FAIL`
)<any, any, any>();

export const createAddonAsync = createAsyncAction(
  `${p}/POST_ADDON_INIT`,
  `${p}/POST_ADDON_DONE`,
  `${p}/POST_ADDON_FAIL`
)<any, any, any>();

export const removeAddonAsync = createAsyncAction(
  `${p}/DEL_ADDON_INIT`,
  `${p}/DEL_ADDON_DONE`,
  `${p}/DEL_ADDON_FAIL`
)<any, any, any>();
