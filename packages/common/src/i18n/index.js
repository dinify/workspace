import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './locales';
import moment from 'moment';

// TODO: move to backend with SSR for optimized loading

export default ({namespace, lang, fallback}) => {
  if (fallback === []) fallback = ['en'];
  const options = {
    lng: lang, // the language to use for translations
    resources: locales,
    ns: [ 'common', 'app' ], // array of namespaces to load
    defaultNS: namespace ? namespace : 'common',
    fallbackNS: 'common',
    fallbackLng: fallback ? fallback : 'en', // use english if fallback not specified
    interpolation: {
      escapeValue: false // react has builtin protection against xss
    }
  };

  i18n
    .use(initReactI18next)
    .init(options);

  i18n.on('languageChanged', function(lng) {
    moment.locale(lng);
  });
}
