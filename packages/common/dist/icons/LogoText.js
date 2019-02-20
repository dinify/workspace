"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _default = function _default(_ref) {
  var style = _ref.style,
      props = _objectWithoutProperties(_ref, ["style"]);

  return _react.default.createElement("svg", _extends({
    style: _objectSpread({
      width: 78,
      marginLeft: -1,
      marginRight: -1
    }, style),
    viewBox: "0 0 78 24"
  }, props), _react.default.createElement("g", {
    id: "Main"
  }, _react.default.createElement("path", {
    d: "M33.1,6.5H37c1.2,0,2.2,0.2,3.1,0.7c0.9,0.5,1.6,1.2,2,2c0.5,0.9,0.7,1.9,0.7,3s-0.2,2.1-0.7,3c-0.5,0.9-1.2,1.5-2,2 C39.2,17.8,38.2,18,37,18h-3.9V6.5z M36.9,16c1.2,0,2.2-0.3,2.8-1s1-1.6,1-2.7s-0.3-2-1-2.7c-0.7-0.7-1.6-1-2.8-1h-1.6V16H36.9z"
  }), _react.default.createElement("path", {
    d: "M44.8,8.5c-0.3-0.3-0.4-0.6-0.4-1c0-0.4,0.1-0.7,0.4-1c0.3-0.3,0.6-0.4,1-0.4s0.7,0.1,1,0.4c0.3,0.3,0.4,0.6,0.4,1 c0,0.4-0.1,0.7-0.4,1c-0.3,0.3-0.6,0.4-1,0.4S45.1,8.8,44.8,8.5z M44.7,9.8h2.1V18h-2.1V9.8z"
  }), _react.default.createElement("path", {
    d: "M49,9.8h2v1h0.1c0.2-0.4,0.6-0.7,1-0.9s0.9-0.3,1.5-0.3c1,0,1.7,0.3,2.2,0.9c0.5,0.6,0.8,1.4,0.8,2.4V18h-2.1v-4.8 c0-0.5-0.1-0.9-0.4-1.2c-0.3-0.3-0.6-0.4-1.1-0.4c-0.6,0-1,0.2-1.4,0.7c-0.3,0.4-0.5,1-0.5,1.6V18H49V9.8z"
  }), _react.default.createElement("path", {
    d: "M58.8,8.5c-0.3-0.3-0.4-0.6-0.4-1c0-0.4,0.1-0.7,0.4-1c0.3-0.3,0.6-0.4,1-0.4s0.7,0.1,1,0.4c0.3,0.3,0.4,0.6,0.4,1 c0,0.4-0.1,0.7-0.4,1c-0.3,0.3-0.6,0.4-1,0.4S59.1,8.8,58.8,8.5z M58.7,9.8h2.1V18h-2.1V9.8z"
  }), _react.default.createElement("path", {
    d: "M63.9,11.6h-1.5V9.8h1.5V9.4c0-0.9,0.3-1.7,0.8-2.2c0.6-0.5,1.3-0.8,2.2-0.8c0.5,0,1,0.1,1.3,0.2v2 c-0.2-0.1-0.4-0.1-0.5-0.2c-0.2,0-0.3-0.1-0.5-0.1c-0.4,0-0.6,0.1-0.8,0.3C66.1,8.9,66,9.2,66,9.5v0.3h2v1.8h-2V18h-2.1V11.6z"
  }), _react.default.createElement("path", {
    d: "M72.2,17.6l-3.4-7.8h2.4l2.1,5.1h0.1l2-5.1h2.3l-5,11.6h-2.3L72.2,17.6z"
  }), _react.default.createElement("path", {
    d: "M13,22.4l-1-1C11.1,20.5,9.9,20,8.5,20H2.1L0.9,4h6.7c1.8,0,3.5,0.5,5,1.5L13,5.8l0.4-0.3c1.5-1,3.2-1.5,5-1.5h6.7l-1.1,16 h-6.4c-1.3,0-2.6,0.5-3.5,1.5L13,22.4z M3.9,18h4.6c1.7,0,3.2,0.6,4.5,1.6c1.3-1.1,2.8-1.6,4.5-1.6h4.6l0.9-12h-4.5 c-1.4,0-2.7,0.4-3.9,1.2l-1.5,1l-1.5-1C10.3,6.4,9,6,7.6,6H3.1L3.9,18z"
  })));
};

exports.default = _default;