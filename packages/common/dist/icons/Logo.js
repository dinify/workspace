"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = function _default(props) {
  return _react.default.createElement(_SvgIcon.default, _extends({
    viewBox: "0 0 24 24"
  }, props), _react.default.createElement("path", {
    d: "M12,22.4l-1-1C10.1,20.5,8.9,20,7.5,20H1.1L0,4h6.6c1.8,0,3.5,0.5,5,1.5L12,5.8l0.4-0.3c1.5-1,3.2-1.5,5-1.5 H24l-1.1,16h-6.4c-1.3,0-2.6,0.5-3.5,1.5L12,22.4z M2.9,18h4.6c1.7,0,3.2,0.6,4.5,1.6c1.3-1.1,2.8-1.6,4.5-1.6h4.6l0.8-12h-4.4 c-1.4,0-2.7,0.4-3.9,1.2l-1.5,1l-1.5-1C9.3,6.4,8,6,6.6,6H2.1L2.9,18z"
  }));
};

exports.default = _default;