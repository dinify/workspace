"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Globalize v1.4.0
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
 * Globalize v1.4.0 2018-07-17T20:38Z Released under the MIT license
 * http://git.io/TrdQbw
 */
(function (root, factory) {
  // UMD returnExports
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
    // Node, CommonJS
    module.exports = factory(require("cldrjs"));
  } else {
    // Global
    root.Globalize = factory(root.Cldr);
  }
})(void 0, function (Cldr) {
  /**
   * A toString method that outputs meaningful values for objects or arrays and
   * still performs as fast as a plain string in case variable is string, or as
   * fast as `"" + number` in case variable is a number.
   * Ref: http://jsperf.com/my-stringify
   */
  var toString = function toString(variable) {
    return typeof variable === "string" ? variable : typeof variable === "number" ? "" + variable : JSON.stringify(variable);
  };
  /**
   * formatMessage( message, data )
   *
   * @message [String] A message with optional {vars} to be replaced.
   *
   * @data [Array or JSON] Object with replacing-variables content.
   *
   * Return the formatted message. For example:
   *
   * - formatMessage( "{0} second", [ 1 ] ); // 1 second
   *
   * - formatMessage( "{0}/{1}", ["m", "s"] ); // m/s
   *
   * - formatMessage( "{name} <{email}>", {
   *     name: "Foo",
   *     email: "bar@baz.qux"
   *   }); // Foo <bar@baz.qux>
   */


  var formatMessage = function formatMessage(message, data) {
    // Replace {attribute}'s
    message = message.replace(/{[0-9a-zA-Z-_. ]+}/g, function (name) {
      name = name.replace(/^{([^}]*)}$/, "$1");
      return toString(data[name]);
    });
    return message;
  };

  var objectExtend = function objectExtend() {
    var destination = arguments[0],
        sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
      var prop;

      for (prop in source) {
        destination[prop] = source[prop];
      }
    });
    return destination;
  };

  var createError = function createError(code, message, attributes) {
    var error;
    message = code + (message ? ": " + formatMessage(message, attributes) : "");
    error = new Error(message);
    error.code = code;
    objectExtend(error, attributes);
    return error;
  };

  var runtimeStringify = function runtimeStringify(args) {
    return JSON.stringify(args, function (key, value) {
      if (value && value.runtimeKey) {
        return value.runtimeKey;
      }

      return value;
    });
  }; // Based on http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery


  var stringHash = function stringHash(str) {
    return [].reduce.call(str, function (hash, i) {
      var chr = i.charCodeAt(0);
      hash = (hash << 5) - hash + chr;
      return hash | 0;
    }, 0);
  };

  var runtimeKey = function runtimeKey(fnName, locale, args, argsStr) {
    var hash;
    argsStr = argsStr || runtimeStringify(args);
    hash = stringHash(fnName + locale + argsStr);
    return hash > 0 ? "a" + hash : "b" + Math.abs(hash);
  };

  var functionName = function functionName(fn) {
    if (fn.name !== undefined) {
      return fn.name;
    } // fn.name is not supported by IE.


    var matches = /^function\s+([\w\$]+)\s*\(/.exec(fn.toString());

    if (matches && matches.length > 0) {
      return matches[1];
    }
  };

  var runtimeBind = function runtimeBind(args, cldr, fn, runtimeArgs) {
    var argsStr = runtimeStringify(args),
        fnName = functionName(fn),
        locale = cldr.locale; // If name of the function is not available, this is most likely due to uglification,
    // which most likely means we are in production, and runtimeBind here is not necessary.

    if (!fnName) {
      return fn;
    }

    fn.runtimeKey = runtimeKey(fnName, locale, null, argsStr);

    fn.generatorString = function () {
      return "Globalize(\"" + locale + "\")." + fnName + "(" + argsStr.slice(1, -1) + ")";
    };

    fn.runtimeArgs = runtimeArgs;
    return fn;
  };

  var validate = function validate(code, message, check, attributes) {
    if (!check) {
      throw createError(code, message, attributes);
    }
  };

  var alwaysArray = function alwaysArray(stringOrArray) {
    return Array.isArray(stringOrArray) ? stringOrArray : stringOrArray ? [stringOrArray] : [];
  };

  var validateCldr = function validateCldr(path, value, options) {
    var skipBoolean;
    options = options || {};
    skipBoolean = alwaysArray(options.skip).some(function (pathRe) {
      return pathRe.test(path);
    });
    validate("E_MISSING_CLDR", "Missing required CLDR content `{path}`.", value || skipBoolean, {
      path: path
    });
  };

  var validateDefaultLocale = function validateDefaultLocale(value) {
    validate("E_DEFAULT_LOCALE_NOT_DEFINED", "Default locale has not been defined.", value !== undefined, {});
  };

  var validateParameterPresence = function validateParameterPresence(value, name) {
    validate("E_MISSING_PARAMETER", "Missing required parameter `{name}`.", value !== undefined, {
      name: name
    });
  };
  /**
   * range( value, name, minimum, maximum )
   *
   * @value [Number].
   *
   * @name [String] name of variable.
   *
   * @minimum [Number]. The lowest valid value, inclusive.
   *
   * @maximum [Number]. The greatest valid value, inclusive.
   */


  var validateParameterRange = function validateParameterRange(value, name, minimum, maximum) {
    validate("E_PAR_OUT_OF_RANGE", "Parameter `{name}` has value `{value}` out of range [{minimum}, {maximum}].", value === undefined || value >= minimum && value <= maximum, {
      maximum: maximum,
      minimum: minimum,
      name: name,
      value: value
    });
  };

  var validateParameterType = function validateParameterType(value, name, check, expected) {
    validate("E_INVALID_PAR_TYPE", "Invalid `{name}` parameter ({value}). {expected} expected.", check, {
      expected: expected,
      name: name,
      value: value
    });
  };

  var validateParameterTypeLocale = function validateParameterTypeLocale(value, name) {
    validateParameterType(value, name, value === undefined || typeof value === "string" || value instanceof Cldr, "String or Cldr instance");
  };
  /**
   * Function inspired by jQuery Core, but reduced to our use case.
   */


  var isPlainObject = function isPlainObject(obj) {
    return obj !== null && "" + obj === "[object Object]";
  };

  var validateParameterTypePlainObject = function validateParameterTypePlainObject(value, name) {
    validateParameterType(value, name, value === undefined || isPlainObject(value), "Plain Object");
  };

  var alwaysCldr = function alwaysCldr(localeOrCldr) {
    return localeOrCldr instanceof Cldr ? localeOrCldr : new Cldr(localeOrCldr);
  }; // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions?redirectlocale=en-US&redirectslug=JavaScript%2FGuide%2FRegular_Expressions


  var regexpEscape = function regexpEscape(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  };

  var stringPad = function stringPad(str, count, right) {
    var length;

    if (typeof str !== "string") {
      str = String(str);
    }

    for (length = str.length; length < count; length += 1) {
      str = right ? str + "0" : "0" + str;
    }

    return str;
  };

  function validateLikelySubtags(cldr) {
    cldr.once("get", validateCldr);
    cldr.get("supplemental/likelySubtags");
  }
  /**
   * [new] Globalize( locale|cldr )
   *
   * @locale [String]
   *
   * @cldr [Cldr instance]
   *
   * Create a Globalize instance.
   */


  function Globalize(locale) {
    if (!(this instanceof Globalize)) {
      return new Globalize(locale);
    }

    validateParameterPresence(locale, "locale");
    validateParameterTypeLocale(locale, "locale");
    this.cldr = alwaysCldr(locale);
    validateLikelySubtags(this.cldr);
  }
  /**
   * Globalize.load( json, ... )
   *
   * @json [JSON]
   *
   * Load resolved or unresolved cldr data.
   * Somewhat equivalent to previous Globalize.addCultureInfo(...).
   */


  Globalize.load = function () {
    // validations are delegated to Cldr.load().
    Cldr.load.apply(Cldr, arguments);
  };
  /**
   * Globalize.locale( [locale|cldr] )
   *
   * @locale [String]
   *
   * @cldr [Cldr instance]
   *
   * Set default Cldr instance if locale or cldr argument is passed.
   *
   * Return the default Cldr instance.
   */


  Globalize.locale = function (locale) {
    validateParameterTypeLocale(locale, "locale");

    if (arguments.length) {
      this.cldr = alwaysCldr(locale);
      validateLikelySubtags(this.cldr);
    }

    return this.cldr;
  };
  /**
   * Optimization to avoid duplicating some internal functions across modules.
   */


  Globalize._alwaysArray = alwaysArray;
  Globalize._createError = createError;
  Globalize._formatMessage = formatMessage;
  Globalize._isPlainObject = isPlainObject;
  Globalize._objectExtend = objectExtend;
  Globalize._regexpEscape = regexpEscape;
  Globalize._runtimeBind = runtimeBind;
  Globalize._stringPad = stringPad;
  Globalize._validate = validate;
  Globalize._validateCldr = validateCldr;
  Globalize._validateDefaultLocale = validateDefaultLocale;
  Globalize._validateParameterPresence = validateParameterPresence;
  Globalize._validateParameterRange = validateParameterRange;
  Globalize._validateParameterTypePlainObject = validateParameterTypePlainObject;
  Globalize._validateParameterType = validateParameterType;
  return Globalize;
});