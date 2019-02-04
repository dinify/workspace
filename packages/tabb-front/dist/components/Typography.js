"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var styles = function styles(theme) {
  return {
    overline: {
      lineHeight: 'unset',
      letterSpacing: "".concat(1 / 12, "rem")
    },
    subtitle2: {
      fontWeight: '700'
    }
  };
};

var Typography = function Typography(props) {
  var className = props.className,
      children = props.children,
      classes = props.classes,
      variant = props.variant,
      other = _objectWithoutProperties(props, ["className", "children", "classes", "variant"]);

  var classNames;

  switch (variant) {
    case 'overline':
    case 'subtitle2':
      classNames = "".concat(className, " ").concat(classes[variant]);
      break;

    default:
      classNames = className;
      break;
  }

  return _react.default.createElement(_Typography.default, _extends({
    className: classNames,
    variant: variant
  }, other), children);
};

var _default = (0, _styles.withStyles)(styles)(Typography);

exports.default = _default;