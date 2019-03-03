"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AccountExistsDialog = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _reduxForm = require("redux-form");

var _redux = require("redux");

var _reactReduxFirebase = require("react-redux-firebase");

var _EmailRounded = _interopRequireDefault(require("@material-ui/icons/EmailRounded"));

var _VisibilityRounded = _interopRequireDefault(require("@material-ui/icons/VisibilityRounded"));

var _VisibilityOffRounded = _interopRequireDefault(require("@material-ui/icons/VisibilityOffRounded"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _Text = _interopRequireDefault(require("../Inputs/Text"));

var _GoogleButton = _interopRequireDefault(require("../GoogleButton"));

var _FacebookButton = _interopRequireDefault(require("../FacebookButton"));

var _FacebookLogo = _interopRequireDefault(require("../../icons/FacebookLogo"));

var _GoogleLogo = _interopRequireDefault(require("../../icons/GoogleLogo"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _materialUiToggleIcon = _interopRequireDefault(require("material-ui-toggle-icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PasswordForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PasswordForm, _React$Component);

  function PasswordForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PasswordForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PasswordForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      showPassword: false,
      errors: {}
    });

    _defineProperty(_assertThisInitialized(_this), "onError", function (error) {
      console.log(error);
      if (error.code === 'auth/wrong-password') _this.setState({
        errors: {
          password: 'The password is incorrect'
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _this$props = _this.props,
          handleSubmit = _this$props.handleSubmit,
          _this$props$onSubmit = _this$props.onSubmit,
          onSubmit = _this$props$onSubmit === void 0 ? function () {} : _this$props$onSubmit,
          submitting = _this$props.submitting,
          email = _this$props.email;
      var _this$state = _this.state,
          showPassword = _this$state.showPassword,
          errors = _this$state.errors;
      return _react.default.createElement("form", {
        onSubmit: handleSubmit(function (params) {
          onSubmit(_objectSpread({
            onError: _this.onError
          }, params));
        })
      }, _react.default.createElement(_reduxForm.Field, {
        name: "email",
        component: _Text.default,
        componentProps: {
          label: 'Email address',
          type: 'email',
          disabled: true,
          fullWidth: true,
          name: 'email',
          autocapitalization: 'none',
          autoComplete: 'email',
          value: email
        }
      }), _react.default.createElement(_reduxForm.Field, {
        name: "password",
        component: _Text.default,
        meta: {
          error: errors.password
        },
        componentProps: {
          style: {
            marginTop: 8
          },
          label: 'Password',
          type: showPassword ? 'text' : 'password',
          fullWidth: true,
          name: 'password',
          autoComplete: 'current-password',
          InputProps: {
            endAdornment: _react.default.createElement(_InputAdornment.default, {
              position: "end"
            }, _react.default.createElement(_IconButton.default, {
              "aria-label": "Toggle password visibility",
              onClick: function onClick() {
                _this.setState({
                  showPassword: !showPassword
                });
              }
            }, _react.default.createElement(_materialUiToggleIcon.default, {
              on: !showPassword,
              onIcon: _react.default.createElement(_VisibilityRounded.default, null),
              offIcon: _react.default.createElement(_VisibilityOffRounded.default, null)
            })))
          }
        }
      }), _react.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'flex-end'
        }
      }, _react.default.createElement(_Button.default, {
        disabled: submitting,
        style: {
          marginTop: 24,
          marginRight: -16
        },
        type: "submit",
        color: "primary"
      }, "Sign in")));
    });

    return _this;
  }

  return PasswordForm;
}(_react.default.Component);

PasswordForm = (0, _reduxForm.reduxForm)({
  form: 'auth/password'
})(PasswordForm);
var providers = {
  'google.com': {
    name: 'Google account',
    className: 'google',
    icon: function icon() {
      return _react.default.createElement(_GoogleLogo.default, null);
    },
    component: function component(_ref) {
      var firebase = _ref.firebase,
          callback = _ref.callback;
      return _react.default.createElement(_GoogleButton.default, {
        onClick: function onClick() {
          firebase.login({
            provider: 'google',
            type: 'popup'
          }).then(callback);
        }
      });
    }
  },
  'facebook.com': {
    name: 'Facebook account',
    className: 'facebook',
    icon: function icon() {
      return _react.default.createElement(_FacebookLogo.default, null);
    },
    component: function component(_ref2) {
      var firebase = _ref2.firebase,
          callback = _ref2.callback;
      return _react.default.createElement(_FacebookButton.default, {
        onClick: function onClick() {
          firebase.login({
            provider: 'facebook',
            type: 'popup'
          }).then(callback);
        }
      });
    }
  },
  'password': {
    name: 'Email address',
    icon: function icon() {
      return _react.default.createElement(_EmailRounded.default, null);
    },
    component: function component(_ref3) {
      var firebase = _ref3.firebase,
          email = _ref3.email,
          callback = _ref3.callback;
      return _react.default.createElement(PasswordForm, {
        onSubmit: function onSubmit(params) {
          var email = params.email,
              password = params.password;
          firebase.login({
            email: email,
            password: password
          }).then(callback);
        },
        email: email
      });
    }
  }
};

var styles = function styles(theme) {
  return {
    google: theme.palette.type === 'light' ? {
      backgroundColor: 'transparent',
      border: '1px solid rgba(0, 0, 0, 0.23)'
    } : {
      backgroundColor: 'rgba(255, 255, 255, 0.87)'
    },
    facebook: {
      backgroundColor: '#3b5998',
      color: '#fff'
    }
  };
};

var AccountExistsDialog = function AccountExistsDialog(props) {
  var classes = props.classes,
      onClose = props.onClose,
      firebase = props.firebase,
      methods = props.methods,
      providerName = props.providerName,
      email = props.email,
      action = props.action,
      _props$open = props.open,
      open = _props$open === void 0 ? false : _props$open,
      other = _objectWithoutProperties(props, ["classes", "onClose", "firebase", "methods", "providerName", "email", "action", "open"]);

  return _react.default.createElement(_Dialog.default, _extends({
    onClose: onClose,
    open: open
  }, other), providerName && _react.default.createElement(_DialogContent.default, {
    style: {
      paddingBottom: 0
    }
  }, _react.default.createElement(_Typography.default, {
    style: {
      marginBottom: 8
    },
    variant: "overline",
    color: "textSecondary"
  }, "Login attempt"), _react.default.createElement(_ListItem.default, {
    style: {
      padding: 0
    }
  }, _react.default.createElement(_Avatar.default, {
    className: classes[providers[providerName].className]
  }, providers[providerName].icon()), _react.default.createElement(_ListItemText.default, {
    primary: email,
    primaryTypographyProps: {
      noWrap: true
    },
    secondary: providers[providerName].name
  }))), providerName && _react.default.createElement(_Divider.default, {
    style: {
      marginTop: 16,
      marginBottom: 16
    }
  }), _react.default.createElement(_DialogContent.default, null, _react.default.createElement(_Typography.default, {
    style: {
      marginBottom: 8
    },
    variant: "caption",
    color: "textSecondary"
  }, "Your account already exists with this email address, continue with one of the providers below to sign in."), methods && methods.map(function (method) {
    var provider = providers[method];
    return _react.default.createElement("div", {
      key: method,
      style: {
        paddingTop: 8
      }
    }, _react.default.createElement(provider.component, {
      firebase: firebase,
      email: email,
      callback: onClose
    }));
  })));
};

exports.AccountExistsDialog = AccountExistsDialog;

var _default = (0, _redux.compose)((0, _reactReduxFirebase.firebaseConnect)(), (0, _styles.withStyles)(styles))(AccountExistsDialog);

exports.default = _default;