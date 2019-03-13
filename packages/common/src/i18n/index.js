import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './locales';
import moment from 'moment';
import globalize from './globalize';
import { supplementalPaths } from './cldr';

// TODO: move to backend with SSR for optimized loading

const ROOT = 'https://static.dinify.app';

const getMainFiles = (locale) => {
  return [
    `main/${locale}/currencies`,
    `main/${locale}/languages`,
    `main/${locale}/territories`,
    `main/${locale}/numbers`
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
  if (fallback === []) fallback = ['en'];

  let globalized;
  const options = {
    lng: lang, // the language to use for translations
    resources: locales,
    ns: [ 'common', 'app' ], // array of namespaces to load
    defaultNS: namespace ? namespace : 'common',
    fallbackNS: 'common',
    fallbackLng: fallback ? fallback : 'en', // use english if fallback not specified
    interpolation: {
      escapeValue: false, // react has builtin protection against xss
      format: (value, format, lng) => {
        const delimiter = ':';
        const delimiterSecondary = ',';
        const split = format.split(delimiter);
        const type = split[0];
        let params;
        if (split.length > 1) params = split[1].split(delimiterSecondary);

        if (type === 'case') {
          if (params[0] === 'upper') return value.toUpperCase();
          if (params[0] === 'lower') return value.toLowerCase();
        }
        if (type === 'date') {
          return moment(value).format(params[0]);
        }
        if (type === 'currency') {
          // TODO: warning, globalized instance might still be undefined (async!)
          if (!globalized) return '';
          return globalized.currencyFormatter(params[0])(value);
        }
        if (type === 'currencyName') {
          if (!globalized) return '';
          const displayName = globalized.cldr.main(`numbers/currencies/${value}/displayName`);
          return displayName;
        }
        if (type === 'languageName') {
          if (!globalized) return '';
          const displayName = globalized.cldr.main(`localeDisplayNames/languages/${value}`);
          return displayName;
        }
        if (type === 'territoryName') {
          if (!globalized) return '';
          const displayName = globalized.cldr.main(`localeDisplayNames/territories/${value}`);
          return displayName;
        }
        if (type === 'array') {
          // TODO return formatted display list pattern
        }

        // fallback
        if (Array.isArray(value)) ; // TODO return formatted display list pattern
        if (value instanceof Date) return moment(value).format(format);
        return value;
      }
    }
  };

  let i18nInstanceReference;

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
                    'cldr/supplemental/currencyData'
                  ];

                  const requiredFiles = supplemental.concat(getMainFiles(globalizeInstance.locale));

                  Promise.all(requiredFiles.map(file =>
                    fetch(`${ROOT}/${file}`).then((response) => response.json()))
                  ).then((values) => {
                    globalize.load(...values);
                    callback(globalizeInstance);
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

      Promise.all(requiredFiles.map(file =>
        fetch(`${ROOT}/${file}`).then((response) => response.json()))
      ).then((values) => {
        globalize.load(...values);
        callback(globalizeInstance);
      })
    })((globalizeInstance) => {
      i18nInstanceReference.globalize = globalizeInstance;
      globalized = globalizeInstance;
    })
  });

  return i18n;
}
