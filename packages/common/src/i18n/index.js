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
    ns: [ 'common', 'app' ], // array of namespaces to load
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
        if (formatted) return formatted;

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

                  /* const available = [
                    "af",
                    "af-NA",
                    "am",
                    "ar",
                    "ar-AE",
                    "ar-BH",
                    "ar-DJ",
                    "ar-DZ",
                    "ar-EG",
                    "ar-EH",
                    "ar-ER",
                    "ar-IL",
                    "ar-IQ",
                    "ar-JO",
                    "ar-KM",
                    "ar-KW",
                    "ar-LB",
                    "ar-LY",
                    "ar-MA",
                    "ar-MR",
                    "ar-OM",
                    "ar-PS",
                    "ar-QA",
                    "ar-SA",
                    "ar-SD",
                    "ar-SO",
                    "ar-SS",
                    "ar-SY",
                    "ar-TD",
                    "ar-TN",
                    "ar-YE",
                    "as",
                    "az",
                    "az-Latn",
                    "be",
                    "bg",
                    "bn",
                    "bn-IN",
                    "bs",
                    "bs-Latn",
                    "ca",
                    "ca-AD",
                    "ca-ES-VALENCIA",
                    "ca-FR",
                    "ca-IT",
                    "cs",
                    "cy",
                    "da",
                    "da-GL",
                    "de",
                    "de-AT",
                    "de-BE",
                    "de-CH",
                    "de-IT",
                    "de-LI",
                    "de-LU",
                    "el",
                    "el-CY",
                    "en",
                    "en-001",
                    "en-150",
                    "en-AG",
                    "en-AI",
                    "en-AS",
                    "en-AT",
                    "en-AU",
                    "en-BB",
                    "en-BE",
                    "en-BI",
                    "en-BM",
                    "en-BS",
                    "en-BW",
                    "en-BZ",
                    "en-CA",
                    "en-CC",
                    "en-CH",
                    "en-CK",
                    "en-CM",
                    "en-CX",
                    "en-CY",
                    "en-DE",
                    "en-DG",
                    "en-DK",
                    "en-DM",
                    "en-ER",
                    "en-FI",
                    "en-FJ",
                    "en-FK",
                    "en-FM",
                    "en-GB",
                    "en-GD",
                    "en-GG",
                    "en-GH",
                    "en-GI",
                    "en-GM",
                    "en-GU",
                    "en-GY",
                    "en-HK",
                    "en-IE",
                    "en-IL",
                    "en-IM",
                    "en-IN",
                    "en-IO",
                    "en-JE",
                    "en-JM",
                    "en-KE",
                    "en-KI",
                    "en-KN",
                    "en-KY",
                    "en-LC",
                    "en-LR",
                    "en-LS",
                    "en-MG",
                    "en-MH",
                    "en-MO",
                    "en-MP",
                    "en-MS",
                    "en-MT",
                    "en-MU",
                    "en-MW",
                    "en-MY",
                    "en-NA",
                    "en-NF",
                    "en-NG",
                    "en-NL",
                    "en-NR",
                    "en-NU",
                    "en-NZ",
                    "en-PG",
                    "en-PH",
                    "en-PK",
                    "en-PN",
                    "en-PR",
                    "en-PW",
                    "en-RW",
                    "en-SB",
                    "en-SC",
                    "en-SD",
                    "en-SE",
                    "en-SG",
                    "en-SH",
                    "en-SI",
                    "en-SL",
                    "en-SS",
                    "en-SX",
                    "en-SZ",
                    "en-TC",
                    "en-TK",
                    "en-TO",
                    "en-TT",
                    "en-TV",
                    "en-TZ",
                    "en-UG",
                    "en-UM",
                    "en-US-POSIX",
                    "en-VC",
                    "en-VG",
                    "en-VI",
                    "en-VU",
                    "en-WS",
                    "en-ZA",
                    "en-ZM",
                    "en-ZW",
                    "es",
                    "es-419",
                    "es-AR",
                    "es-BO",
                    "es-BR",
                    "es-BZ",
                    "es-CL",
                    "es-CO",
                    "es-CR",
                    "es-CU",
                    "es-DO",
                    "es-EA",
                    "es-EC",
                    "es-GQ",
                    "es-GT",
                    "es-HN",
                    "es-IC",
                    "es-MX",
                    "es-NI",
                    "es-PA",
                    "es-PE",
                    "es-PH",
                    "es-PR",
                    "es-PY",
                    "es-SV",
                    "es-US",
                    "es-UY",
                    "es-VE",
                    "et",
                    "eu",
                    "fa",
                    "fa-AF",
                    "fi",
                    "fil",
                    "fo",
                    "fo-DK",
                    "fr",
                    "fr-BE",
                    "fr-BF",
                    "fr-BI",
                    "fr-BJ",
                    "fr-BL",
                    "fr-CA",
                    "fr-CD",
                    "fr-CF",
                    "fr-CG",
                    "fr-CH",
                    "fr-CI",
                    "fr-CM",
                    "fr-DJ",
                    "fr-DZ",
                    "fr-GA",
                    "fr-GF",
                    "fr-GN",
                    "fr-GP",
                    "fr-GQ",
                    "fr-HT",
                    "fr-KM",
                    "fr-LU",
                    "fr-MA",
                    "fr-MC",
                    "fr-MF",
                    "fr-MG",
                    "fr-ML",
                    "fr-MQ",
                    "fr-MR",
                    "fr-MU",
                    "fr-NC",
                    "fr-NE",
                    "fr-PF",
                    "fr-PM",
                    "fr-RE",
                    "fr-RW",
                    "fr-SC",
                    "fr-SN",
                    "fr-SY",
                    "fr-TD",
                    "fr-TG",
                    "fr-TN",
                    "fr-VU",
                    "fr-WF",
                    "fr-YT",
                    "ga",
                    "gl",
                    "gu",
                    "he",
                    "hi",
                    "hr",
                    "hr-BA",
                    "hu",
                    "hy",
                    "id",
                    "is",
                    "it",
                    "it-CH",
                    "it-SM",
                    "it-VA",
                    "ja",
                    "ka",
                    "kk",
                    "km",
                    "kn",
                    "ko",
                    "ko-KP",
                    "ky",
                    "lo",
                    "lt",
                    "lv",
                    "mk",
                    "ml",
                    "mn",
                    "mr",
                    "ms",
                    "ms-BN",
                    "ms-SG",
                    "my",
                    "nb",
                    "nb-SJ",
                    "ne",
                    "ne-IN",
                    "nl",
                    "nl-AW",
                    "nl-BE",
                    "nl-BQ",
                    "nl-CW",
                    "nl-SR",
                    "nl-SX",
                    "or",
                    "pa",
                    "pa-Guru",
                    "pl",
                    "ps",
                    "pt",
                    "pt-AO",
                    "pt-CH",
                    "pt-CV",
                    "pt-GQ",
                    "pt-GW",
                    "pt-LU",
                    "pt-MO",
                    "pt-MZ",
                    "pt-PT",
                    "pt-ST",
                    "pt-TL",
                    "ro",
                    "ro-MD",
                    "root",
                    "ru",
                    "ru-BY",
                    "ru-KG",
                    "ru-KZ",
                    "ru-MD",
                    "ru-UA",
                    "sd",
                    "si",
                    "sk",
                    "sl",
                    "sq",
                    "sq-MK",
                    "sq-XK",
                    "sr",
                    "sr-Cyrl",
                    "sr-Cyrl-BA",
                    "sr-Cyrl-ME",
                    "sr-Cyrl-XK",
                    "sr-Latn",
                    "sr-Latn-BA",
                    "sr-Latn-ME",
                    "sr-Latn-XK",
                    "sv",
                    "sv-AX",
                    "sv-FI",
                    "sw",
                    "sw-CD",
                    "sw-KE",
                    "sw-UG",
                    "ta",
                    "ta-LK",
                    "ta-MY",
                    "ta-SG",
                    "te",
                    "th",
                    "tk",
                    "tr",
                    "tr-CY",
                    "uk",
                    "ur",
                    "ur-IN",
                    "uz",
                    "uz-Latn",
                    "vi",
                    "yue",
                    "yue-Hant",
                    "zh",
                    "zh-Hans",
                    "zh-Hans-HK",
                    "zh-Hans-MO",
                    "zh-Hans-SG",
                    "zh-Hant",
                    "zh-Hant-HK",
                    "zh-Hant-MO",
                    "zu"
                  ]
                  let result = '';
                  available.forEach(locale => {
                    const attrs = globalize.locale(locale).attributes;
                    result += locale + '\t' + attrs.minLanguageId + '\t' + attrs.maxLanguageId + '\t' + attrs.language + '\t' + attrs.script + '\t' + attrs.region + '\n';
                  });
                  console.log(result); */

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
