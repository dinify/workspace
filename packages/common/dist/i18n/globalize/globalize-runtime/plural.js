"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Globalize Runtime v1.4.0
 *
 * http://github.com/jquery/globalize
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2018-07-17T20:38Z
 */

/*!
 * Globalize Runtime v1.4.0 2018-07-17T20:38Z Released under the MIT license
 * http://git.io/TrdQbw
 */
(function (root, factory) {
  "use strict"; // UMD returnExports

  if (typeof define === "function" && define.amd) {
    // AMD
    define(["../globalize-runtime"], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
    // Node, CommonJS
    module.exports = factory(require("../globalize-runtime"));
  } else {
    // Extend global
    factory(root.Globalize);
  }
})(void 0, function (Globalize) {
  var runtimeKey = Globalize._runtimeKey,
      validateParameterPresence = Globalize._validateParameterPresence,
      validateParameterType = Globalize._validateParameterType;

  var validateParameterTypeNumber = function validateParameterTypeNumber(value, name) {
    validateParameterType(value, name, value === undefined || typeof value === "number", "Number");
  };

  var pluralGeneratorFn = function pluralGeneratorFn(plural) {
    return function pluralGenerator(value) {
      validateParameterPresence(value, "value");
      validateParameterTypeNumber(value, "value");
      return plural(value);
    };
  };

  Globalize._pluralGeneratorFn = pluralGeneratorFn;
  Globalize._validateParameterTypeNumber = validateParameterTypeNumber;

  Globalize.plural = Globalize.prototype.plural = function (value, options) {
    validateParameterPresence(value, "value");
    validateParameterTypeNumber(value, "value");
    return this.pluralGenerator(options)(value);
  };

  Globalize.pluralGenerator = Globalize.prototype.pluralGenerator = function (options) {
    options = options || {};
    return Globalize[runtimeKey("pluralGenerator", this._locale, [options])];
  };

  return Globalize;
});