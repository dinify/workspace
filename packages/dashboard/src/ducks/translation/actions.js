
export const addLocale = payload => ({
  type: 'ADD_LOCALE',
  payload,
});

export const selectLocale = payload => ({
  type: 'SELECT_LOCALE',
  payload,
});

export const pushTranslation = payload => ({
  type: 'PUSH_TRANSLATION_INIT',
  payload,
});
