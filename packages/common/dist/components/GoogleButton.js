"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _GoogleLogo = _interopRequireDefault(require("../icons/GoogleLogo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var styles = function styles(theme) {
  return {
    leftGutter: {
      marginLeft: theme.spacing.unit * 2
    },
    googleButton: theme.palette.type === 'light' ? {
      height: 40,
      justifyContent: 'start'
    } : {
      height: 40,
      justifyContent: 'start',
      border: '1px solid transparent',
      color: 'rgba(0, 0, 0, 0.72)',
      backgroundColor: 'rgba(255, 255, 255, 0.87)',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none'
      },
      '&:active': {
        boxShadow: 'none'
      },
      '&:focus': {
        boxShadow: 'none'
      }
    },
    uncapitalized: {
      textTransform: 'none'
    }
  };
};

var GoogleButton = function GoogleButton(_ref) {
  var classes = _ref.classes,
      theme = _ref.theme,
      props = _objectWithoutProperties(_ref, ["classes", "theme"]);

  return _react.default.createElement(_Button.default, _extends({
    fullWidth: true,
    className: classes.googleButton,
    classes: {
      label: classes.uncapitalized
    },
    variant: theme.palette.type === 'light' ? 'outlined' : 'contained'
  }, props), _react.default.createElement(_GoogleLogo.default, null), _react.default.createElement("span", {
    className: classes.leftGutter
  }, "Continue with Google"));
};

var _default = (0, _styles.withTheme)()((0, _styles.withStyles)(styles)(GoogleButton));

exports.default = _default;