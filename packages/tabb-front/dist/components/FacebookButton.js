"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _FacebookLogo = _interopRequireDefault(require("../icons/FacebookLogo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var styles = function styles(theme) {
  return {
    leftGutter: {
      marginLeft: theme.spacing.unit * 2
    },
    facebookButton: {
      height: 40,
      justifyContent: 'start',
      color: 'rgba(255, 255, 255, 0.87)',
      backgroundColor: '#3b5998',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: '#546ca5' // #3b5998 + 0.12 white

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

var FacebookButton = function FacebookButton(_ref) {
  var classes = _ref.classes,
      props = _objectWithoutProperties(_ref, ["classes"]);

  return _react.default.createElement(_Button.default, _extends({
    fullWidth: true,
    className: classes.facebookButton,
    classes: {
      label: classes.uncapitalized
    },
    variant: "contained"
  }, props), _react.default.createElement(_FacebookLogo.default, null), _react.default.createElement("span", {
    className: classes.leftGutter
  }, "Continue with Facebook"));
};

var _default = (0, _styles.withStyles)(styles)(FacebookButton);

exports.default = _default;