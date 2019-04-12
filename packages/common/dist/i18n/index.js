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
    ns: ['common', 'app', 'dashboard'],
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
        if (formatted !== null) return formatted; // other misc formatters

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