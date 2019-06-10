import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './locales';
import moment from 'moment';
import globalize from './globalize';
import formatters from './formatters';
import { supplementalPaths } from './cldr';

// TODO: move to backend with SSR for optimized loading

const ROOT = 'https://static.dinify.app';

const getMainFiles = (locale) => {
  return [
    `main/${locale}/currencies`,
    `main/${locale}/languages`,
    `main/${locale}/territories`,
    `main/${locale}/numbers`,
    `main/${locale}/ca-gregorian`,
    `main/${locale}/units`,
    `main/${locale}/listPatterns`
  ];
}

const getGlobalizedInstance = (language) => {
  const instance = globalize(language);
  const locale = instance.cldr.attributes.minLanguageId;
  instance.cldr.attributes.bundle = locale;
  instance.locale = locale;
  return instance;
}



export default ({namespace, lang, fallback}) => {
  const defaultFallback = ['en']
  if (fallback && fallback.length) defaultFallback = fallback;

  let globalized;
  const options = {
    lng: lang, // the language to use for translations
    resources: locales,
    ns: [ 'common', 'app', 'dashboard', 'landing' ], // array of namespaces to load
    defaultNS: namespace || 'common',
    fallbackNS: 'common',
    fallbackLng: defaultFallback,
    interpolation: {
      escapeValue: false, // react has builtin protection against xss
      format: (value, format, lng) => {
        const delimiter = ':';
        const delimiterSecondary = ',';
        const split = format.split(delimiter);
        const type = split[0];
        let params = [];
        if (split.length > 1) params = split[1].split(delimiterSecondary);

        const formatted = formatters(globalized)(value, type, params);
        if (formatted !== null) return formatted;

        // other misc formatters
        if (type === 'case') {
          if (params[0] === 'upper') return value.toUpperCase();
          if (params[0] === 'lower') return value.toLowerCase();
        }

        // fallback
        if (Array.isArray(value)) ; // TODO return formatted display list pattern
        if (value instanceof Date) return moment(value).format(format);
        return value;
      }
    }
  };

  let i18nInstanceReference;
  let previousInstanceReference;

  i18n
    .use(initReactI18next)
    .use({
      type: '3rdParty',
      init(instance) {
        i18nInstanceReference = instance;
        ((callback) => {
          fetch(`${ROOT}/cldr/supplemental/likelySubtags`)
            .then((response) => {
                response.json().then((likelySubtagsSata) => {
                  globalize.load(likelySubtagsSata);

                  const globalizeInstance = getGlobalizedInstance(lang);
                  const supplemental = [
                    'cldr/supplemental/numberingSystems',
                    'cldr/supplemental/plurals',
                    'cldr/supplemental/ordinals',
                    'cldr/supplemental/timeData',
                    'cldr/supplemental/currencyData'
                  ];

                  const requiredFiles = supplemental.concat(getMainFiles(globalizeInstance.locale));

                  Promise.all(requiredFiles.map((file, index) =>
                    fetch(`${ROOT}/${file}`).then((response) => {
                      if (response.status >= 300) {
                        if (index === 0) console.log('Locale not available:', lang);
                        return null;
                      }
                      return response.json();
                    }))
                  ).then((values) => {
                    if (values[0]) {
                      globalize.load(...values);
                      callback(globalizeInstance);
                    }
                    else callback(globalized);
                  })
                });
              }
            ).catch((err) => {
              console.log('Fetch error:', err);
            });
        })((globalizeInstance) => {
          instance.globalize = globalizeInstance;
          globalized = globalizeInstance;
        })
      },
    })
    .init(options);

  i18n.on('languageChanged', function(lng) {
    moment.locale(lng);
    ((callback) => {
      let globalizeInstance = getGlobalizedInstance(lng);

      const requiredFiles = getMainFiles(globalizeInstance.locale)

      Promise.all(requiredFiles.map((file, index) =>
        fetch(`${ROOT}/${file}`).then((response) => {
          if (response.status >= 300) {
            if (index === 0) console.log('Locale not available:', lang);
            return null;
          }
          return response.json();
        }))
      ).then((values) => {
        if (values[0]) {
          globalize.load(...values);
          callback(globalizeInstance);
        }
        else callback(globalized);
      })
    })((globalizeInstance) => {
      i18nInstanceReference.globalize = globalizeInstance;
      globalized = globalizeInstance;
    })
  });

  return i18n;
}
