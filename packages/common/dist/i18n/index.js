"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

var _locales = _interopRequireDefault(require("./locales"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: move to backend with SSR for optimized loading
var _default = function _default(_ref) {
  var namespace = _ref.namespace,
      lang = _ref.lang,
      fallback = _ref.fallback;
  if (fallback === []) fallback = ['en'];
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
      escapeValue: false // react has builtin protection against xss

    }
  };

  _i18next.default.use(_reactI18next.initReactI18next).init(options);

  _i18next.default.on('languageChanged', function (lng) {
    _moment.default.locale(lng);
  });
};

exports.default = _default;