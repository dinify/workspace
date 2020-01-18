import {
  createAsyncAction
} from 'typesafe-actions';

const p = 'dinify/option';

export const fetchOptionsAsync = createAsyncAction(
  `${p}/GET_OPTIONS_INIT`,
  `${p}/GET_OPTIONS_DONE`,
  `${p}/GET_OPTIONS_FAIL`
)<any, any, any>();

export const createOptionAsync = createAsyncAction(
  `${p}/POST_OPTION_INIT`,
  `${p}/POST_OPTION_DONE`,
  `${p}/POST_OPTION_FAIL`
)<any, any, any>();

export const removeOptionAsync = createAsyncAction(
  `${p}/DEL_OPTION_INIT`,
  `${p}/DEL_OPTION_DONE`,
  `${p}/DEL_OPTION_FAIL`
)<any, any, any>();

export const createChoiceAsync = createAsyncAction(
  `${p}/POST_CHOICE_INIT`,
  `${p}/POST_CHOICE_DONE`,
  `${p}/POST_CHOICE_FAIL`
)<any, any, any>();

export const removeChoiceAsync = createAsyncAction(
  `${p}/DEL_CHOICE_INIT`,
  `${p}/DEL_CHOICE_DONE`,
  `${p}/DEL_CHOICE_FAIL`
)<any, any, any>();

export const collapseOptionInit = (payload: any) => ({
  type: 'COLLAPSE_OPTION',
  payload,
});
