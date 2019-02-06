"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _ramda = _interopRequireDefault(require("ramda"));

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  progressMap: {},
  errorsMap: {},
  dialogs: {},
  theme: 'light'
};

function findNested(obj, key, memo) {
  var i;
  var proto = Object.prototype;
  var ts = proto.toString;
  var hasOwn = proto.hasOwnProperty.bind(obj);
  if (ts.call(memo) !== '[object Array]') memo = [];

  for (i in obj) {
    if (hasOwn(i)) {
      if (i === key) {
        memo.push(obj[i]);
      } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
        findNested(obj[i], key, memo);
      }
    }
  }

  return memo;
}

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type.includes('_FAIL')) {
    var theMessage = findNested(action.payload, 'message');
    var theCode = findNested(action.payload, 'code');

    if (theMessage) {
      state = _ramda.default.assocPath(['errorsMap', action.type], {
        message: theMessage,
        code: theCode
      })(state);
    }
  }

  switch (action.type) {
    case _types.default.DIALOG_OPEN:
      {
        // TODO: close other dialogs
        return _ramda.default.assocPath(['dialogs', action.payload.id], _objectSpread({}, action.payload, {
          open: true
        }))(state);
      }

    case _types.default.DIALOG_CLOSE:
      {
        return _ramda.default.assocPath(['dialogs', action.payload], _objectSpread({}, state.dialogs[action.payload], {
          open: false
        }))(state);
      }

    case _types.default.TOGGLE_THEME:
      {
        return _ramda.default.assoc('theme', state.theme === 'dark' ? 'light' : 'dark')(state);
      }

    case 'persist/REHYDRATE':
      {
        return _ramda.default.assoc('errorsMap', {})(_ramda.default.assoc('progressMap', {})(state));
      }

    default:
      return state;
  }
}