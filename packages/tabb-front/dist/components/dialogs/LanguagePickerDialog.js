"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _redux = require("redux");

var _recompose = require("recompose");

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _ChevronRightRounded = _interopRequireDefault(require("@material-ui/icons/ChevronRightRounded"));

var _Flag = _interopRequireDefault(require("components/Flag"));

var _languages = _interopRequireDefault(require("lib/languages"));

var _countries = _interopRequireDefault(require("lib/countries"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var styles = function styles(theme) {
  return {};
};

var LanguagePickerDialog = function LanguagePickerDialog(props) {
  var classes = props.classes,
      filter = props.filter,
      setFilter = props.setFilter,
      selectedLang = props.selectedLang,
      setSelectedLang = props.setSelectedLang,
      _props$open = props.open,
      open = _props$open === void 0 ? false : _props$open,
      other = _objectWithoutProperties(props, ["classes", "filter", "setFilter", "selectedLang", "setSelectedLang", "open"]);

  return _react.default.createElement(_Dialog.default, _extends({
    open: open
  }, other), _react.default.createElement(_DialogTitle.default, null, "Select language"), _react.default.createElement("div", {
    style: {
      padding: '0px 24px'
    }
  }, _react.default.createElement(_TextField.default, {
    fullWidth: true,
    dense: true,
    name: "Search",
    label: "Search",
    hint: "Search",
    variant: "filled",
    value: filter,
    onChange: function onChange(evt) {
      setFilter(evt.target.text);
    }
  })), _react.default.createElement(_Divider.default, {
    style: {
      marginTop: 16
    }
  }), _react.default.createElement("div", {
    style: {
      maxHeight: 240,
      overflowY: 'scroll',
      paddingTop: 8,
      paddingBottom: 8
    }
  }, _languages.default.map(function (lang, i) {
    var solo = lang[3].length === 1;
    return _react.default.createElement(_ListItem.default, {
      key: i,
      dense: true,
      button: true,
      style: {
        paddingLeft: 24,
        paddingRight: 24
      },
      onClick: function onClick() {
        /* TODO: display available regions for language */
      }
    }, _react.default.createElement(_ListItemText.default, {
      primary: lang[1],
      secondary: lang[2]
    }), solo ? _react.default.createElement(_Flag.default, {
      country: lang[3][0][0].split('-')[1]
    }) : _react.default.createElement(_ChevronRightRounded.default, {
      style: {
        opacity: 0.54
      }
    }));
  })), _react.default.createElement(_Divider.default, null), _react.default.createElement(_DialogActions.default, null, _react.default.createElement(_Button.default, {
    color: "primary",
    onClick: function onClick() {
      /* TODO: return selected language */
    }
  }, "Select")));
};

var enhance = (0, _redux.compose)((0, _recompose.withState)('filter', 'setFilter'), (0, _recompose.withState)('selectedLang', 'setSelectedLang'), (0, _styles.withStyles)(styles));

var _default = enhance(LanguagePickerDialog);

exports.default = _default;