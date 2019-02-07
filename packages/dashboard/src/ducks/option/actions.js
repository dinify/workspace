// @flow

export const collapseOptionInit = payload => ({
  type: 'COLLAPSE_OPTION_INIT',
  payload,
});

export const createOptionInit = payload => ({
  type: 'CREATE_OPTION_INIT',
  payload,
});

export const removeOptionInit = payload => ({
  type: 'REMOVE_OPTION_INIT',
  payload,
});

export const createChoiceInit = payload => ({
  type: 'CREATE_CHOICE_INIT',
  payload,
});

export const removeChoiceInit = payload => ({
  type: 'REMOVE_CHOICE_INIT',
  payload,
});
