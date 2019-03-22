"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var R = _interopRequireWildcard(require("ramda"));

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

var _ChevronRightRounded = _interopRequireDefault(require("@material-ui/icons/ChevronRightRounded"));

var _ChevronLeftRounded = _interopRequireDefault(require("@material-ui/icons/ChevronLeftRounded"));

var _Flag = _interopRequireDefault(require("../Flag"));

var _lib = require("../../lib");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var availableLocales = ["af", "af-NA", "am", "ar", "ar-AE", "ar-BH", "ar-DJ", "ar-DZ", "ar-EG", "ar-EH", "ar-ER", "ar-IL", "ar-IQ", "ar-JO", "ar-KM", "ar-KW", "ar-LB", "ar-LY", "ar-MA", "ar-MR", "ar-OM", "ar-PS", "ar-QA", "ar-SA", "ar-SD", "ar-SO", "ar-SS", "ar-SY", "ar-TD", "ar-TN", "ar-YE", "as", "az", "az-Latn", "be", "bg", "bn", "bn-IN", "bs", "bs-Latn", "ca", "ca-AD", "ca-ES-VALENCIA", "ca-FR", "ca-IT", "cs", "cy", "da", "da-GL", "de", "de-AT", "de-BE", "de-CH", "de-IT", "de-LI", "de-LU", "el", "el-CY", "en", "en-001", "en-150", "en-AG", "en-AI", "en-AS", "en-AT", "en-AU", "en-BB", "en-BE", "en-BI", "en-BM", "en-BS", "en-BW", "en-BZ", "en-CA", "en-CC", "en-CH", "en-CK", "en-CM", "en-CX", "en-CY", "en-DE", "en-DG", "en-DK", "en-DM", "en-ER", "en-FI", "en-FJ", "en-FK", "en-FM", "en-GB", "en-GD", "en-GG", "en-GH", "en-GI", "en-GM", "en-GU", "en-GY", "en-HK", "en-IE", "en-IL", "en-IM", "en-IN", "en-IO", "en-JE", "en-JM", "en-KE", "en-KI", "en-KN", "en-KY", "en-LC", "en-LR", "en-LS", "en-MG", "en-MH", "en-MO", "en-MP", "en-MS", "en-MT", "en-MU", "en-MW", "en-MY", "en-NA", "en-NF", "en-NG", "en-NL", "en-NR", "en-NU", "en-NZ", "en-PG", "en-PH", "en-PK", "en-PN", "en-PR", "en-PW", "en-RW", "en-SB", "en-SC", "en-SD", "en-SE", "en-SG", "en-SH", "en-SI", "en-SL", "en-SS", "en-SX", "en-SZ", "en-TC", "en-TK", "en-TO", "en-TT", "en-TV", "en-TZ", "en-UG", "en-UM", "en-US-POSIX", "en-VC", "en-VG", "en-VI", "en-VU", "en-WS", "en-ZA", "en-ZM", "en-ZW", "es", "es-419", "es-AR", "es-BO", "es-BR", "es-BZ", "es-CL", "es-CO", "es-CR", "es-CU", "es-DO", "es-EA", "es-EC", "es-GQ", "es-GT", "es-HN", "es-IC", "es-MX", "es-NI", "es-PA", "es-PE", "es-PH", "es-PR", "es-PY", "es-SV", "es-US", "es-UY", "es-VE", "et", "eu", "fa", "fa-AF", "fi", "fil", "fo", "fo-DK", "fr", "fr-BE", "fr-BF", "fr-BI", "fr-BJ", "fr-BL", "fr-CA", "fr-CD", "fr-CF", "fr-CG", "fr-CH", "fr-CI", "fr-CM", "fr-DJ", "fr-DZ", "fr-GA", "fr-GF", "fr-GN", "fr-GP", "fr-GQ", "fr-HT", "fr-KM", "fr-LU", "fr-MA", "fr-MC", "fr-MF", "fr-MG", "fr-ML", "fr-MQ", "fr-MR", "fr-MU", "fr-NC", "fr-NE", "fr-PF", "fr-PM", "fr-RE", "fr-RW", "fr-SC", "fr-SN", "fr-SY", "fr-TD", "fr-TG", "fr-TN", "fr-VU", "fr-WF", "fr-YT", "ga", "gl", "gu", "he", "hi", "hr", "hr-BA", "hu", "hy", "id", "is", "it", "it-CH", "it-SM", "it-VA", "ja", "ka", "kk", "km", "kn", "ko", "ko-KP", "ky", "lo", "lt", "lv", "mk", "ml", "mn", "mr", "ms", "ms-BN", "ms-SG", "my", "nb", "nb-SJ", "ne", "ne-IN", "nl", "nl-AW", "nl-BE", "nl-BQ", "nl-CW", "nl-SR", "nl-SX", "or", "pa", "pa-Guru", "pl", "ps", "pt", "pt-AO", "pt-CH", "pt-CV", "pt-GQ", "pt-GW", "pt-LU", "pt-MO", "pt-MZ", "pt-PT", "pt-ST", "pt-TL", "ro", "ro-MD", "root", "ru", "ru-BY", "ru-KG", "ru-KZ", "ru-MD", "ru-UA", "sd", "si", "sk", "sl", "sq", "sq-MK", "sq-XK", "sr", "sr-Cyrl", "sr-Cyrl-BA", "sr-Cyrl-ME", "sr-Cyrl-XK", "sr-Latn", "sr-Latn-BA", "sr-Latn-ME", "sr-Latn-XK", "sv", "sv-AX", "sv-FI", "sw", "sw-CD", "sw-KE", "sw-UG", "ta", "ta-LK", "ta-MY", "ta-SG", "te", "th", "tk", "tr", "tr-CY", "uk", "ur", "ur-IN", "uz", "uz-Latn", "vi", "yue", "yue-Hant", "zh", "zh-Hans", "zh-Hans-HK", "zh-Hans-MO", "zh-Hans-SG", "zh-Hant", "zh-Hant-HK", "zh-Hant-MO", "zu"];

var LanguagePickerDialog = function LanguagePickerDialog(props) {
  var classes = props.classes,
      filter = props.filter,
      setFilter = props.setFilter,
      selectedLang = props.selectedLang,
      setSelectedLang = props.setSelectedLang,
      page = props.page,
      prevPage = props.prevPage,
      setPage = props.setPage,
      _props$open = props.open,
      open = _props$open === void 0 ? false : _props$open,
      _onClose = props.onClose,
      resetState = props.resetState,
      initialSelectedLanguage = props.initialSelectedLanguage,
      other = _objectWithoutProperties(props, ["classes", "filter", "setFilter", "selectedLang", "setSelectedLang", "page", "prevPage", "setPage", "open", "onClose", "resetState", "initialSelectedLanguage"]);

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  var languages = _lib.languages.map(function (lang) {
    var nameEnglish = lang.name;
    var localizedName = i18n.format(lang.code, 'languageName');
    return _objectSpread({}, lang, {
      nameEnglish: nameEnglish,
      name: localizedName || nameEnglish
    });
  });

  var filtered = R.filter(function (lang) {
    if (!filter) return true;
    return (0, _match.default)(lang.name, filter).length + (0, _match.default)(lang.nameNative, filter).length > 0;
  }, languages);

  var languageClickHandler = function languageClickHandler(lang) {
    var solo = lang.countries.length === 1;
    if (solo) setSelectedLang(lang.countries[0].langtag);else setPage(lang);
  };

  var countryClickHandler = function countryClickHandler(country) {
    setSelectedLang(country.langtag);
  };

  var highlightBold = function highlightBold(text) {
    if (!filter) return text;
    return _react.default.createElement("span", null, (0, _parse.default)(text, (0, _match.default)(text, filter)).map(function (part, i) {
      return part.highlight ? _react.default.createElement("b", {
        key: i
      }, part.text) : part.text;
    }));
  };

  var animConfig = {
    stiffness: 480,
    damping: 48
  };

  var mainPage = _react.default.createElement("div", {
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
    name: t('search'),
    label: t('search'),
    hint: t('search'),
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
  }, filtered.map(function (lang, i) {
    var solo = lang.countries.length === 1;
    var primary = highlightBold(lang.nameNative);
    var secondary = highlightBold(lang.name);

    if (lang.name.toLowerCase() === lang.nameNative.toLowerCase()) {
      if (solo) secondary = _react.default.createElement("i", null, lang.countries[0].nameNative);else secondary = '';
    }

    var selected = false;
    if (selectedLang) selected = selectedLang.split('-')[0] === lang.code;
    return _react.default.createElement(_ListItem.default, {
      disabled: !availableLocales.includes(lang.code),
      key: i,
      dense: true,
      button: true,
      selected: selected,
      style: {
        paddingLeft: 24,
        paddingRight: 24
      },
      onClick: function onClick() {
        return languageClickHandler(lang);
      }
    }, _react.default.createElement(_ListItemText.default, {
      primary: primary,
      secondary: secondary
    }), solo ? _react.default.createElement(_Flag.default, {
      country: lang.countries[0].regionCode
    }) : _react.default.createElement(_ChevronRightRounded.default, {
      style: {
        opacity: 0.54
      }
    }));
  })));

  var dialogContent;
  var currentPage = page || prevPage;

  if (currentPage) {
    dialogContent = _react.default.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }
    }, _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
      style: {
        margin: '0px 24px'
      },
      onClick: function onClick() {
        return setPage(null);
      }
    }, _react.default.createElement(_ChevronLeftRounded.default, null), t('back'))), _react.default.createElement(_Divider.default, {
      style: {
        marginTop: 16
      }
    }), _react.default.createElement("div", {
      className: classes.scrollingList,
      style: {
        flex: 1
      }
    }, currentPage.countries.map(function (country, i) {
      var name = i18n.format(country.regionCode, 'territoryName');
      var secondary;
      if (name !== country.nameNative) secondary = name;
      return _react.default.createElement(_ListItem.default, {
        key: i,
        dense: true,
        button: true,
        selected: country.langtag === selectedLang,
        style: {
          paddingLeft: 24,
          paddingRight: 24
        },
        onClick: function onClick() {
          return countryClickHandler(country);
        }
      }, _react.default.createElement(_ListItemText.default, {
        primary: country.nameNative,
        secondary: secondary
      }), _react.default.createElement(_Flag.default, {
        country: country.regionCode
      }));
    })));
  }

  return _react.default.createElement(_Dialog.default, _extends({
    open: open,
    onClose: function onClose() {
      resetState();

      _onClose(null);
    }
  }, other), _react.default.createElement(_DialogTitle.default, null, page ? t('selectCountry') : t('selectLanguage')), _react.default.createElement("div", {
    style: {
      height: 312,
      width: 240,
      overflow: 'hidden'
    }
  }, _react.default.createElement(_reactMotion.Motion, {
    defaultStyle: {
      x: 0
    },
    style: {
      x: (0, _reactMotion.spring)(page ? 1 : 0, animConfig)
    }
  }, function (style) {
    return _react.default.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        transform: "translate3d(".concat(-240 * style.x, "px, 0, 0)")
      }
    }, _react.default.createElement("div", {
      style: {
        minWidth: 240
      }
    }, mainPage), _react.default.createElement("div", {
      style: {
        minWidth: 240
      }
    }, dialogContent));
  })), _react.default.createElement(_Divider.default, null), _react.default.createElement(_DialogActions.default, null, _react.default.createElement(_Button.default, {
    color: "primary",
    disabled: !selectedLang,
    onClick: function onClick() {
      resetState();

      _onClose(selectedLang);
    }
  }, t('select'))));
};

var enhance = (0, _redux.compose)((0, _recompose.withStateHandlers)(function (_ref) {
  var initialSelectedLanguage = _ref.initialSelectedLanguage;
  return {
    selectedLang: initialSelectedLanguage,
    page: null,
    prevPage: null,
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
  setPage: function setPage() {
    return function (value) {
      if (value == null) return {
        page: value
      };else return {
        page: value,
        prevPage: value
      };
    };
  },
  setSelectedLang: function setSelectedLang() {
    return function (value) {
      return {
        selectedLang: value
      };
    };
  },
  resetState: function resetState() {
    return function (value) {
      return {
        selectedLang: null,
        page: null,
        filter: ''
      };
    };
  }
}), (0, _styles.withStyles)(styles));

var _default = enhance(LanguagePickerDialog);

exports.default = _default;