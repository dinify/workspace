
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

export const suggestTranslation = payload => ({
  type: 'SUGGEST_TRANSLATION_INIT',
  payload,
});

export const suggestAllTranslations = payload => ({
  type: 'SUGGEST_ALLTRANSLATIONS_INIT',
  payload,
});

