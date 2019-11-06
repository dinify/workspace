import {
  createAsyncAction
} from 'typesafe-actions';
import * as types from './types';

const p = 'dinify/option';

export const fetchOptionsAsync = createAsyncAction(
  `${p}/GET_OPTIONS_INIT`,
  `${p}/GET_OPTIONS_DONE`,
  `${p}/GET_OPTIONS_FAIL`
)();

export const createOptionAsync = createAsyncAction(
  `${p}/POST_OPTION_INIT`,
  `${p}/POST_OPTION_DONE`,
  `${p}/POST_OPTION_FAIL`
)();

export const removeOptionInit = (payload: any) => ({
  type: types.REMOVE_OPTION_INIT,
  payload,
});

export const createChoiceAsync = createAsyncAction(
  `${p}/POST_CHOICE_INIT`,
  `${p}/POST_CHOICE_DONE`,
  `${p}/POST_CHOICE_FAIL`
)();

export const removeChoiceInit = (payload: any) => ({
  type: types.REMOVE_CHOICE_INIT,
  payload,
});

export const collapseOptionInit = (payload: any) => ({
  type: types.COLLAPSE_OPTION_INIT,
  payload,
});
