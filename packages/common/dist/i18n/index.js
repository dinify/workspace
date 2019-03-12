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

var _cldr = require("./cldr");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// TODO: move to backend with SSR for optimized loading
var ROOT = 'https://static.dinify.app';

var getMainFiles = function getMainFiles(locale) {
  return ["main/".concat(locale, "/currencies"), "main/".concat(locale, "/numbers")];
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
  if (fallback === []) fallback = ['en'];
  var globalized;

  (function (callback) {
    fetch("".concat(ROOT, "/cldr/supplemental/likelySubtags")).then(function (response) {
      response.json().then(function (likelySubtagsSata) {
        _globalize.default.load(likelySubtagsSata);

        var instance = getGlobalizedInstance(lang);
        var supplemental = ['cldr/supplemental/numberingSystems', 'cldr/supplemental/plurals', 'cldr/supplemental/ordinals', 'cldr/supplemental/currencyData'];
        var requiredFiles = supplemental.concat(getMainFiles(instance.locale));
        Promise.all(requiredFiles.map(function (file) {
          return fetch("".concat(ROOT, "/").concat(file)).then(function (response) {
            return response.json();
          });
        })).then(function (values) {
          _globalize.default.load.apply(_globalize.default, _toConsumableArray(values));

          callback(instance);
        });
      });
    }).catch(function (err) {
      console.log('Fetch error:', err);
    });
  })(function (instance) {
    globalized = instance;
  });

  var options = {
    lng: lang,
    // the language to use for translations
    resources: _locales.default,
    ns: ['common', 'app'],
    // array of namespaces to load
    defaultNS: namespace ? namespace : 'common',
    fallbackNS: 'common',
    fallbackLng: fallback ? fallback : 'en',
    // use english if fallback not specified
    interpolation: {
      escapeValue: false,
      // react has builtin protection against xss
      format: function format(value, _format, lng) {
        var delimiter = ':';
        var delimiterSecondary = ',';

        var split = _format.split(delimiter);

        var type = split[0];
        var params;
        if (split.length > 1) params = split[1].split(delimiterSecondary);

        if (type === 'case') {
          if (params[0] === 'upper') return value.toUpperCase();
          if (params[0] === 'lower') return value.toLowerCase();
        }

        if (type === 'date') {
          return (0, _moment.default)(value).format(params[0]);
        }

        if (type === 'currency') {
          // TODO: warning, globalized instance might still be undefined (async!)
          if (!globalized) return '...';
          return globalized.currencyFormatter(params[0])(value);
        }

        if (type === 'array') {} // TODO return formatted display list pattern
        // fallback


        if (Array.isArray(value)) ; // TODO return formatted display list pattern

        if (value instanceof Date) return (0, _moment.default)(value).format(_format);
        return value;
      }
    }
  };

  _i18next.default.use(_reactI18next.initReactI18next).init(options);

  _i18next.default.on('languageChanged', function (lng) {
    _moment.default.locale(lng);

    (function (callback) {
      var instance = getGlobalizedInstance(lng);
      var requiredFiles = getMainFiles(instance.locale);
      Promise.all(requiredFiles.map(function (file) {
        return fetch("".concat(ROOT, "/").concat(file)).then(function (response) {
          return response.json();
        });
      })).then(function (values) {
        _globalize.default.load.apply(_globalize.default, _toConsumableArray(values));

        callback(instance);
      });
    })(function (instance) {
      globalized = instance;
    });
  });
};

exports.default = _default;