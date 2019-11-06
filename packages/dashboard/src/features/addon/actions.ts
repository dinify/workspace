import {
  createAsyncAction
} from 'typesafe-actions';
import * as types from './types';

const p = 'dinify/addon';

export const fetchAddonsAsync = createAsyncAction(
  `${p}/GET_ADDONS_INIT`,
  `${p}/GET_ADDONS_DONE`,
  `${p}/GET_ADDONS_FAIL`
)();

export const createAddonAsync = createAsyncAction(
  `${p}/POST_ADDON_INIT`,
  `${p}/POST_ADDON_DONE`,
  `${p}/POST_ADDON_FAIL`
)();


export const removeAddonInit = (payload: any) => ({
  type: types.REMOVE_ADDON_INIT,
  payload,
});
