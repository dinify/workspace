"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currencies = exports.defaultCurrencies = exports.currencyRates = exports.countries = exports.languages = void 0;

var _FN = require("./FN");

var _languages = _interopRequireDefault(require("./languages.json"));

var _countries = _interopRequireDefault(require("./countries.json"));

var _currencyRates = _interopRequireDefault(require("./currencyRates.json"));

var _defaultCurrencies = _interopRequireDefault(require("./defaultCurrencies.json"));

var _currencies = _interopRequireDefault(require("./currencies.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var languages = (0, _FN.parseLanguages)(_languages.default);
exports.languages = languages;
var countries = _countries.default;
exports.countries = countries;
var currencyRates = _currencyRates.default;
exports.currencyRates = currencyRates;
var defaultCurrencies = _defaultCurrencies.default;
exports.defaultCurrencies = defaultCurrencies;
var currencies = _currencies.default;
exports.currencies = currencies;