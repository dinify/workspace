import * as types from './types';

export const fetchOptions = payload => ({
  type: types.FETCH_RESTAURANTOPTIONS_INIT,
  payload
});

export const createOptionInit = payload => ({
  type: types.CREATE_OPTION_INIT,
  payload,
});

export const removeOptionInit = payload => ({
  type: types.REMOVE_OPTION_INIT,
  payload,
});

export const createChoiceInit = payload => ({
  type: types.CREATE_CHOICE_INIT,
  payload,
});

export const removeChoiceInit = payload => ({
  type: types.REMOVE_CHOICE_INIT,
  payload,
});

export const collapseOptionInit = payload => ({
  type: types.COLLAPSE_OPTION_INIT,
  payload,
});
