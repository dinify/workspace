
export const addLanguage = payload => ({
  type: 'CREATE_MENULANGUAGE_INIT',
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

export const selectLanguage = payload => ({
  type: 'SELECT_LANGUAGE',
  payload,
});

export const confirmPreferredLanguages = () => ({
  type: 'CONFIRM_PREFERRED_LANGUAGES',
})
