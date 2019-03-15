"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

var _locales = _interopRequireDefault(require("./locales"));

var _moment = _interopRequireDefault(require("moment"));

var _globalize = _interopRequireDefault(require("./globalize"));

var _formatters = _interopRequireDefault(require("./formatters"));

var _cldr = require("./cldr");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

// TODO: move to backend with SSR for optimized loading
var ROOT = 'https://static.dinify.app';

var getMainFiles = function getMainFiles(locale) {
  return ["main/".concat(locale, "/currencies"), "main/".concat(locale, "/languages"), "main/".concat(locale, "/territories"), "main/".concat(locale, "/numbers"), "main/".concat(locale, "/ca-gregorian"), "main/".concat(locale, "/units"), "main/".concat(locale, "/listPatterns")];
};

var getGlobalizedInstance = function getGlobalizedInstance(language) {
  var instance = (0, _globalize.default)(language);
  var locale = instance.cldr.attributes.minLanguageId;
  instance.cldr.attributes.bundle = locale;
  instance.locale = locale;
  return instance;
};

var _default = function _default(_ref) {
  var namespace = _ref.namespace,
      lang = _ref.lang,
      fallback = _ref.fallback;
  var defaultFallback = ['en'];
  if (fallback && fallback.length) defaultFallback = (_readOnlyError("defaultFallback"), fallback);
  var globalized;
  var options = {
    lng: lang,
    // the language to use for translations
    resources: _locales.default,
    ns: ['common', 'app'],
    // array of namespaces to load
    defaultNS: namespace || 'common',
    fallbackNS: 'common',
    fallbackLng: defaultFallback,
    interpolation: {
      escapeValue: false,
      // react has builtin protection against xss
      format: function format(value, _format, lng) {
        var delimiter = ':';
        var delimiterSecondary = ',';

        var split = _format.split(delimiter);

        var type = split[0];
        var params = [];
        if (split.length > 1) params = split[1].split(delimiterSecondary);
        var formatted = (0, _formatters.default)(globalized)(value, type, params);
        if (formatted) return formatted; // other misc formatters

        if (type === 'case') {
          if (params[0] === 'upper') return value.toUpperCase();
          if (params[0] === 'lower') return value.toLowerCase();
        } // fallback


        if (Array.isArray(value)) ; // TODO return formatted display list pattern

        if (value instanceof Date) return (0, _moment.default)(value).format(_format);
        return value;
      }
    }
  };
  var i18nInstanceReference;
  var previousInstanceReference;

  _i18next.default.use(_reactI18next.initReactI18next).use({
    type: '3rdParty',
    init: function init(instance) {
      i18nInstanceReference = instance;

      (function (callback) {
        fetch("".concat(ROOT, "/cldr/supplemental/likelySubtags")).then(function (response) {
          response.json().then(function (likelySubtagsSata) {
            _globalize.default.load(likelySubtagsSata);
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


            var globalizeInstance = getGlobalizedInstance(lang);
            var supplemental = ['cldr/supplemental/numberingSystems', 'cldr/supplemental/plurals', 'cldr/supplemental/ordinals', 'cldr/supplemental/timeData', 'cldr/supplemental/currencyData'];
            var requiredFiles = supplemental.concat(getMainFiles(globalizeInstance.locale));
            Promise.all(requiredFiles.map(function (file, index) {
              return fetch("".concat(ROOT, "/").concat(file)).then(function (response) {
                if (response.status >= 300) {
                  if (index === 0) console.log('Locale not available:', lang);
                  return null;
                }

                return response.json();
              });
            })).then(function (values) {
              if (values[0]) {
                _globalize.default.load.apply(_globalize.default, _toConsumableArray(values));

                callback(globalizeInstance);
              } else callback(globalized);
            });
          });
        }).catch(function (err) {
          console.log('Fetch error:', err);
        });
      })(function (globalizeInstance) {
        instance.globalize = globalizeInstance;
        globalized = globalizeInstance;
      });
    }
  }).init(options);

  _i18next.default.on('languageChanged', function (lng) {
    _moment.default.locale(lng);

    (function (callback) {
      var globalizeInstance = getGlobalizedInstance(lng);
      var requiredFiles = getMainFiles(globalizeInstance.locale);
      Promise.all(requiredFiles.map(function (file, index) {
        return fetch("".concat(ROOT, "/").concat(file)).then(function (response) {
          if (response.status >= 300) {
            if (index === 0) console.log('Locale not available:', lang);
            return null;
          }

          return response.json();
        });
      })).then(function (values) {
        if (values[0]) {
          _globalize.default.load.apply(_globalize.default, _toConsumableArray(values));

          callback(globalizeInstance);
        } else callback(globalized);
      });
    })(function (globalizeInstance) {
      i18nInstanceReference.globalize = globalizeInstance;
      globalized = globalizeInstance;
    });
  });

  return _i18next.default;
};

exports.default = _default;