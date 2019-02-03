"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _Menu = require("@material-ui/core/Menu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Select = function Select(props) {
  var _props$input = props.input,
      value = _props$input.value,
      _onChange = _props$input.onChange,
      name = _props$input.name;
  return _react.default.createElement(_Select.default, _extends({
    name: name,
    value: value,
    onChange: function onChange(newValue) {
      _onChange(newValue);
    }
  }, props.componentProps), props.options.map(function (option, i) {
    return _react.default.createElement(_Menu.MenuItem, {
      key: i,
      value: option.value
    }, option.label);
  }));
};

var _default = Select;
exports.default = _default;