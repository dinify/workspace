"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SignInForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactReduxFirebase = require("react-redux-firebase");

var _styles = require("@material-ui/core/styles");

var _reduxForm = require("redux-form");

var _reactRouterDom = require("react-router-dom");

var _reactMotion = require("react-motion");

var _LogoText = _interopRequireDefault(require("../../icons/LogoText"));

var _ChevronRightRounded = _interopRequireDefault(require("@material-ui/icons/ChevronRightRounded"));

var _ChevronLeftRounded = _interopRequireDefault(require("@material-ui/icons/ChevronLeftRounded"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _AccountExistsDialog = _interopRequireDefault(require("../dialogs/AccountExistsDialog"));

var _ResponsiveContainer = _interopRequireDefault(require("../ResponsiveContainer"));

var _actions = require("../../ducks/auth/actions");

var _actions2 = require("../../ducks/ui/actions");

var _Fields = _interopRequireDefault(require("./Fields"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(theme) {
  return {
    uncapitalized: {
      textTransform: 'none'
    },
    colorTextSecondary: {
      color: theme.palette.text.secondary
    }
  };
};

var SignInForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SignInForm, _React$Component);

  function SignInForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SignInForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SignInForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "validateEmail", function (email) {
      var errors = {};

      if (!email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address';
      } // TODO correct regexp
      // if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);

    });

    _defineProperty(_assertThisInitialized(_this), "signIn", function (_ref) {
      var email = _ref.email,
          password = _ref.password;

      _this.validateEmail(email);

      var errors = {};
      if (!password) errors.password = 'Required';
      if (Object.keys(errors).length !== 0) throw new _reduxForm.SubmissionError(errors);
      var firebase = _this.props.firebase;
      firebase.login({
        email: email,
        password: password
      });
    });

    _defineProperty(_assertThisInitialized(_this), "signUp", function (_ref2) {
      var email = _ref2.email,
          password = _ref2.password,
          firstName = _ref2.firstName,
          lastName = _ref2.lastName;

      _this.validateEmail(email);

      var errors = {};
      if (!password) errors.password = 'Required';
      if (!firstName) errors.firstName = 'Required';
      if (!lastName) errors.lastName = 'Required';
      if (Object.keys(errors).length !== 0) throw new _reduxForm.SubmissionError(errors);
      var firebase = _this.props.firebase;
      firebase.createUser({
        email: email,
        password: password
      }, {
        displayName: "".concat(firstName, " ").concat(lastName),
        email: email
      });
    });

    _defineProperty(_assertThisInitialized(_this), "decide", function (_ref3) {
      var email = _ref3.email;

      _this.validateEmail(email);

      var _this$props = _this.props,
          firebase = _this$props.firebase,
          openDialog = _this$props.openDialog,
          setPage = _this$props.setPage;
      var auth = firebase.auth();
      return auth.fetchSignInMethodsForEmail(email).then(function (methods) {
        if (methods.length === 0) {
          setPage('signUp');
        } else if (methods.includes('password')) {
          setPage('signIn');
        } // present user with dialog with options
        else {
            openDialog({
              id: 'account-exists',
              component: function component(props) {
                return _react.default.createElement(_AccountExistsDialog.default, _extends({
                  providerName: "password",
                  email: email,
                  methods: methods
                }, props));
              }
            });
          }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "forgotPassword", function (_ref4) {
      var email = _ref4.email;
      var firebase = _this.props.firebase;
      return firebase.auth().sendPasswordResetEmail(email);
    });

    return _this;
  }

  _createClass(SignInForm, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          _this$props2$handleSu = _this$props2.handleSubmit,
          handleSubmit = _this$props2$handleSu === void 0 ? function () {} : _this$props2$handleSu,
          pristine = _this$props2.pristine,
          submitting = _this$props2.submitting,
          page = _this$props2.page,
          setPage = _this$props2.setPage,
          env = _this$props2.env;
      var animConfig = {
        stiffness: 480,
        damping: 48
      };
      var formOpen = page !== 'default';
      var submitButtonText = 'Next';
      var submitFc = this.decide;
      var formTitle = 'Sign in';
      var formSubtitle = 'to access more features, like dining history, reviews and saving your favorites';

      var leftButtonAction = function leftButtonAction() {
        return setPage(formOpen ? 'default' : 'signUp');
      };

      if (env === 'DASHBOARD') {
        formSubtitle = 'to start setting things up, sign in with your email or social media account';
      }

      if (page === 'signIn') {
        submitButtonText = 'Sign in';
        formTitle = 'Sign in with password';
        submitFc = this.signIn;
      }

      if (page === 'signUp') {
        submitButtonText = 'Create account';
        formTitle = 'Create account';
        submitFc = this.signUp;
      }

      if (page === 'forgotPassword') {
        submitButtonText = 'Send email';
        formTitle = 'Forgot password';
        submitFc = this.forgotPassword;

        leftButtonAction = function leftButtonAction() {
          return setPage('signIn');
        };

        formSubtitle = 'enter the email address you use to sign in to get a password reset email';
      }

      return _react.default.createElement("form", {
        onSubmit: handleSubmit(submitFc),
        style: {
          height: 'calc(100vh - 112px)'
        }
      }, _react.default.createElement(_ResponsiveContainer.default, {
        style: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, _react.default.createElement("div", {
        style: {
          marginLeft: 32,
          marginRight: 32,
          maxWidth: 512
        }
      }, _react.default.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginBottom: 16
        }
      }, _react.default.createElement(_reactRouterDom.Link, {
        to: "/",
        style: {
          height: 40
        }
      }, _react.default.createElement("div", {
        style: {
          height: 40,
          backgroundColor: "#c13939",
          color: "rgba(255, 255, 255, 1)",
          fill: "rgba(255, 255, 255, 1)",
          borderRadius: 20,
          padding: '8px 16px'
        }
      }, _react.default.createElement(_LogoText.default, {
        color: "inherit"
      }))), _react.default.createElement(_Typography.default, {
        style: {
          marginTop: 16,
          marginBottom: 8
        },
        variant: "h6"
      }, formTitle), _react.default.createElement(_Typography.default, {
        align: "center",
        variant: "caption"
      }, formSubtitle)), _react.default.createElement("div", {
        style: {
          height: 185,
          overflow: 'hidden'
        }
      }, _react.default.createElement(_Fields.default, null)), _react.default.createElement("div", {
        style: {
          display: 'flex',
          marginTop: 16
        }
      }, _react.default.createElement(_Button.default, {
        onClick: leftButtonAction,
        variant: "text",
        className: classes && classes.uncapitalized
      }, formOpen && _react.default.createElement(_ChevronLeftRounded.default, {
        style: {
          fontSize: '1.3125rem',
          marginLeft: -12
        }
      }), formOpen ? 'Back' : 'New account'), _react.default.createElement("div", {
        style: {
          flex: 1
        }
      }), _react.default.createElement(_Button.default, {
        type: "submit",
        disabled: pristine || submitting,
        variant: "outlined",
        color: "primary",
        className: classes && classes.uncapitalized
      }, _react.default.createElement(_reactMotion.Motion, {
        defaultStyle: {
          x: 1
        },
        style: {
          x: (0, _reactMotion.spring)(submitting ? 0 : 1, animConfig)
        }
      }, function (style) {
        return _react.default.createElement("div", {
          style: {
            display: 'flex',
            opacity: style.x
          }
        }, submitButtonText, page === 'default' && _react.default.createElement(_ChevronRightRounded.default, {
          style: {
            fontSize: '1.3125rem',
            marginRight: -12
          }
        }));
      }), submitting && _react.default.createElement(_CircularProgress.default, {
        className: classes && classes.colorTextSecondary,
        style: {
          position: 'absolute'
        },
        size: 16,
        thickness: 6
      }))))));
    }
  }]);

  return SignInForm;
}(_react.default.Component);

exports.SignInForm = SignInForm;
exports.SignInForm = SignInForm = (0, _reduxForm.reduxForm)({
  form: 'auth/signin',
  enableReinitialize: true,
  destroyOnUnmount: false
})(SignInForm);

var SignInPage =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(SignInPage, _React$Component2);

  function SignInPage(props) {
    var _this2;

    _classCallCheck(this, SignInPage);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SignInPage).call(this, props));
    var prefill = props.prefill;
    var initialValues = {};

    if (prefill.email) {
      initialValues.email = prefill.email;
    }

    _this2.state = {
      initialValues: initialValues
    };
    return _this2;
  }

  _createClass(SignInPage, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(SignInForm, _extends({
        initialValues: this.state.initialValues
      }, this.props)));
    }
  }]);

  return SignInPage;
}(_react.default.Component);

var _default = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactReduxFirebase.firebaseConnect)(), (0, _reactRedux.connect)(function (state) {
  return {
    page: state.auth.page,
    prefill: state.restaurant.prefill
  };
}, {
  setPage: _actions.setPage,
  openDialog: _actions2.openDialog
}))(SignInPage);

exports.default = _default;