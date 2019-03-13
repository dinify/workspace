"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ramda = _interopRequireDefault(require("ramda"));

var _redux = require("redux");

var _recompose = require("recompose");

var _reactMotion = require("react-motion");

var _styles = require("@material-ui/core/styles");

var _reactI18next = require("react-i18next");

var _match = _interopRequireDefault(require("autosuggest-highlight/umd/match"));

var _parse = _interopRequireDefault(require("autosuggest-highlight/umd/parse"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ChevronRightRounded = _interopRequireDefault(require("@material-ui/icons/ChevronRightRounded"));

var _ChevronLeftRounded = _interopRequireDefault(require("@material-ui/icons/ChevronLeftRounded"));

var _Flag = _interopRequireDefault(require("../Flag"));

var _lib = require("../../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var styles = function styles(theme) {
  return {
    scrollingList: {
      overflowY: 'scroll',
      paddingTop: 8,
      paddingBottom: 8
    }
  };
};

var CurrencyPickerDialog = function CurrencyPickerDialog(props) {
  var classes = props.classes,
      filter = props.filter,
      setFilter = props.setFilter,
      selectedCurrency = props.selectedCurrency,
      setSelectedCurrency = props.setSelectedCurrency,
      _props$open = props.open,
      open = _props$open === void 0 ? false : _props$open,
      _onClose = props.onClose,
      resetState = props.resetState,
      initialSelectedCurrency = props.initialSelectedCurrency,
      other = _objectWithoutProperties(props, ["classes", "filter", "setFilter", "selectedCurrency", "setSelectedCurrency", "open", "onClose", "resetState", "initialSelectedCurrency"]);

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  var localizeMap = function localizeMap(list) {
    return list.map(function (code) {
      return {
        code: code,
        name: i18n.format(code, 'currencyName')
      };
    });
  };

  var searchFilter = function searchFilter(list) {
    return _ramda.default.filter(function (currency) {
      if (!filter) return true;
      return (0, _match.default)(currency.name, filter).length + (0, _match.default)(currency.code, filter).length > 0;
    }, list);
  };

  var highlightBold = function highlightBold(text) {
    if (!filter) return text;
    return _react.default.createElement("span", null, (0, _parse.default)(text, (0, _match.default)(text, filter)).map(function (part, i) {
      return part.highlight ? _react.default.createElement("b", {
        key: i
      }, part.text) : part.text;
    }));
  };

  var currencyClickHandler = function currencyClickHandler(currencyCode) {
    setSelectedCurrency(currencyCode);
  };

  var sections = [];
  var country = i18n.globalize.cldr.attributes.territory; // TODO: use ip-api.com/json countryCode as fallback

  var suggestedCodes = _lib.defaultCurrencies[country];

  if (suggestedCodes && suggestedCodes.length > 0) {
    var items = searchFilter(localizeMap(suggestedCodes));

    if (items.length > 0) {
      sections.push({
        title: 'suggested',
        items: items
      });
    }

    var remaining = searchFilter(localizeMap(_ramda.default.filter(function (currencyCode) {
      return !suggestedCodes.includes(currencyCode);
    }, _lib.currencies)));

    if (remaining.length > 0) {
      sections.push({
        title: 'other',
        items: remaining
      });
    }
  } else {
    sections.push({
      items: searchFilter(localizeMap(_lib.currencies))
    });
  }

  return _react.default.createElement(_Dialog.default, _extends({
    open: open,
    onClose: function onClose() {
      resetState();

      _onClose(null);
    }
  }, other), _react.default.createElement(_DialogTitle.default, null, t('selectCurrency')), _react.default.createElement("div", {
    style: {
      height: 312,
      width: 240,
      overflow: 'hidden'
    }
  }, _react.default.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, _react.default.createElement("div", {
    style: {
      padding: '0px 24px'
    }
  }, _react.default.createElement(_TextField.default, {
    fullWidth: true,
    name: "Search",
    label: "Search",
    hint: "Search",
    variant: "filled",
    value: filter || '',
    onChange: function onChange(event) {
      return setFilter(event.target.value);
    }
  })), _react.default.createElement(_Divider.default, {
    style: {
      marginTop: 16
    }
  }), _react.default.createElement("div", {
    className: classes.scrollingList,
    style: {
      flex: 1
    }
  }, sections.map(function (section, sectionsIndex) {
    return _react.default.createElement("div", {
      key: section.title
    }, sectionsIndex > 0 && section.title && _react.default.createElement(_Divider.default, {
      style: {
        marginBottom: 8
      }
    }), section.title && _react.default.createElement(_Typography.default, {
      variant: "overline",
      color: "textSecondary",
      style: {
        marginLeft: 24,
        marginRight: 24
      }
    }, t(section.title)), section.items.map(function (currency) {
      var primary = highlightBold(currency.name);
      var secondary = highlightBold(currency.code);
      var selected = selectedCurrency === currency.code;
      return _react.default.createElement(_ListItem.default, {
        key: currency.code,
        dense: true,
        button: true,
        selected: selected,
        style: {
          paddingLeft: 24,
          paddingRight: 24
        },
        onClick: function onClick() {
          currencyClickHandler(currency.code);
        }
      }, _react.default.createElement(_ListItemText.default, {
        primary: primary,
        secondary: secondary
      }));
    }));
  })))), _react.default.createElement(_Divider.default, null), _react.default.createElement(_DialogActions.default, null, _react.default.createElement(_Button.default, {
    color: "primary",
    onClick: function onClick() {
      resetState();

      _onClose({
        clear: true
      });
    }
  }, t('clear')), _react.default.createElement(_Button.default, {
    color: "primary",
    disabled: !selectedCurrency,
    onClick: function onClick() {
      resetState();

      _onClose(selectedCurrency);
    }
  }, t('select'))));
};

var enhance = (0, _redux.compose)((0, _recompose.withStateHandlers)(function (_ref) {
  var initialSelectedCurrency = _ref.initialSelectedCurrency;
  return {
    selectedCurrency: initialSelectedCurrency,
    filter: ''
  };
}, {
  setFilter: function setFilter() {
    return function (value) {
      return {
        filter: value
      };
    };
  },
  setSelectedCurrency: function setSelectedCurrency() {
    return function (value) {
      return {
        selectedCurrency: value
      };
    };
  },
  resetState: function resetState() {
    return function (value) {
      return {
        selectedCurrency: null,
        filter: ''
      };
    };
  }
}), (0, _styles.withStyles)(styles));

var _default = enhance(CurrencyPickerDialog);

exports.default = _default;