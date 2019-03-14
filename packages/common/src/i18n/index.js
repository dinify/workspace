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
    `main/${locale}/numbers`,
    `main/${locale}/ca-gregorian`,
    `main/${locale}/units`
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
        let params = [];
        if (split.length > 1) params = split[1].split(delimiterSecondary);

        if (type === 'case') {
          if (params[0] === 'upper') return value.toUpperCase();
          if (params[0] === 'lower') return value.toLowerCase();
        }
        if (type === 'date') {
          if (!globalized) return '';
          return globalized.dateFormatter({date: params[0] || 'short'})(value);
        }
        if (type === 'time') {
          if (!globalized) return '';
          return globalized.dateFormatter({time: params[0] || 'short'})(value);
        }
        if (type === 'dateTime') {
          if (!globalized) return '';
          return globalized.dateFormatter({datetime: params[0] || 'short'})(value);
        }
        if (type === 'dateTimeSkeleton') {
          if (!globalized) return '';
          return globalized.dateFormatter({skeleton: params[0]})(value);
        }
        if (type === 'weekDayName') {
          if (!globalized) return '';
          const standAloneDays = globalized.cldr.main("dates/calendars/gregorian/days")['stand-alone'];
          return standAloneDays[params[0] || 'wide'][value];
        }
        if (type === 'currency') {
          // TODO: warning, globalized instance might still be undefined (async!)
          if (!globalized) return '';
          return globalized.currencyFormatter(params[0])(value);
        }
        if (type === 'currencyName') {
          if (!globalized) return '';

          if (params[0]) {
            const count = parseFloat(params[0]);
            const plural = globalized.pluralGenerator()(count);
            const result = globalized.cldr.main(`numbers/currencies/${value}/displayName-count-${plural}`);
            if (result) return result;
          }
          return globalized.cldr.main(`numbers/currencies/${value}/displayName`);
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
        if (type === 'unit') {
          if (!globalized) return '';
          return globalized.unitFormatter(params[0], { form: params[1] || 'long' } )(value);
        }
        if (type === 'dateTimeInterval') {
          if (!globalized) return '';
          const hHKk = globalized.cldr.supplemental.timeData.preferred();
          const skeleton = hHKk + 'm';
          const possibleSplitChars = ['–', '-', '\'a\'', 'تا', '～', '~', '至'];
          const intervalFormat = globalized.cldr.main(`dates/calendars/gregorian/dateTimeFormats/intervalFormats/${skeleton}/m`);
          if (intervalFormat) {
            let parts;
            let splitChar;
            possibleSplitChars.forEach(char => {
              if (intervalFormat.includes(char)) {
                splitChar = char;
                parts = intervalFormat.split(char);
              }
            });
            const start = globalized.dateFormatter({raw: parts[0]})(value.start);
            const end = globalized.dateFormatter({raw: parts[1]})(value.end);
            return [start, end].join(splitChar);
          }

          // Use fallback in case format wasn't found
          const start = globalized.dateFormatter({time: 'short'})(value.start);
          const end = globalized.dateFormatter({time: 'short'})(value.end);
          const intervalFormatFallback = globalized.cldr.main(`dates/calendars/gregorian/dateTimeFormats/intervalFormats/intervalFormatFallback`);
          return intervalFormatFallback.replace('{0}', start).replace('{1}', end);
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
                    'cldr/supplemental/timeData',
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
