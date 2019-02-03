"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _OutlinedInput = _interopRequireDefault(require("@material-ui/core/OutlinedInput"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _FormHelperText = _interopRequireDefault(require("@material-ui/core/FormHelperText"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var labelRef;

var Text = function Text(props) {
  var theme = props.theme,
      componentProps = props.componentProps,
      _props$input = props.input,
      value = _props$input.value,
      onChange = _props$input.onChange,
      name = _props$input.name,
      _props$meta = props.meta,
      touched = _props$meta.touched,
      error = _props$meta.error;

  var isEmpty = function isEmpty(str) {
    return !str || str.length === 0;
  };

  var other = componentProps;
  if (typeof componentProps === 'function') other = componentProps({
    value: value,
    error: error
  });
  return _react.default.createElement(_TextField.default, _extends({
    key: theme.palette.type // Rerender on theme change
    ,
    name: name,
    error: !isEmpty(error),
    onChange: onChange,
    value: value,
    helperText: error
  }, other));
};

var NewText = function NewText(_ref) {
  var componentProps = _ref.componentProps,
      _ref$input = _ref.input,
      value = _ref$input.value,
      onChange = _ref$input.onChange,
      name = _ref$input.name,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error;
  var variant = componentProps.variant,
      label = componentProps.label;
  return variant !== 'outlined' ? _react.default.createElement(_FormControl.default, {
    variant: variant,
    error: error ? true : false,
    "aria-describedby": "text-component-helper"
  }, _react.default.createElement(_InputLabel.default, {
    htmlFor: "text-component"
  }, label), _react.default.createElement(_Input.default, _extends({
    id: "text-component",
    name: name,
    value: value,
    onChange: onChange
  }, componentProps)), _react.default.createElement(_FormHelperText.default, {
    id: "text-component-helper"
  }, error)) : _react.default.createElement(_FormControl.default, {
    error: error ? true : false,
    variant: "outlined",
    "aria-describedby": "text-component-helper"
  }, _react.default.createElement(_InputLabel.default, {
    ref: function ref(node) {
      labelRef = _reactDom.default.findDOMNode(node);
    },
    htmlFor: "text-component-outlined"
  }, label), _react.default.createElement(_OutlinedInput.default, _extends({
    id: "text-component-outlined",
    name: name,
    value: value,
    onChange: onChange,
    labelWidth: labelRef ? labelRef.offsetWidth : 0
  }, componentProps)), _react.default.createElement(_FormHelperText.default, {
    id: "text-component-helper"
  }, error));
};

var _default = (0, _styles.withTheme)()(Text);

exports.default = _default;