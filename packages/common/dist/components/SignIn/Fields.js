"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactReduxFirebase = require("react-redux-firebase");

var _styles = require("@material-ui/core/styles");

var _reduxForm = require("redux-form");

var _reactMotion = require("react-motion");

var _materialUiToggleIcon = _interopRequireDefault(require("material-ui-toggle-icon"));

var _VisibilityRounded = _interopRequireDefault(require("@material-ui/icons/VisibilityRounded"));

var _VisibilityOffRounded = _interopRequireDefault(require("@material-ui/icons/VisibilityOffRounded"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Divider = _interopRequireDefault(require("@material-ui/core/Divider"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Text = _interopRequireDefault(require("../Inputs/Text"));

var _GoogleButton = _interopRequireDefault(require("../GoogleButton"));

var _FacebookButton = _interopRequireDefault(require("../FacebookButton"));

var _actions = require("../../ducks/auth/actions");

var _actions2 = require("../../ducks/ui/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    grow: {
      flex: 1
    },
    flex: {
      display: 'flex',
      alignItems: 'center'
    },
    uncapitalized: {
      textTransform: 'none'
    },
    transitionOpacity: {
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter
      })
    },
    background: {
      backgroundColor: theme.palette.background.default
    }
  };
};

var UP = 1;
var DOWN = -1;

var Fields =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Fields, _React$Component);

  function Fields() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Fields);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Fields)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      errors: {}
    });

    return _this;
  }

  _createClass(Fields, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var authError = nextProps.authError;
      var page = this.props.page;
      var errors = {};
      if (!authError) return;

      switch (authError.code) {
        case 'auth/invalid-email':
          errors.email = 'The email address is invalid';
          break;

        case 'auth/email-already-in-use':
          errors.email = 'The email address is already in use';
          break;

        case 'auth/weak-password':
          errors.password = 'The password is too weak';
          break;

        case 'auth/user-disabled':
          errors.email = 'This account has been disabled';
          break;

        case 'auth/user-not-found':
          errors.email = 'No account found with this email';
          break;

        case 'auth/wrong-password':
          errors.password = 'The passoword is incorrect';
          break;

        default:
          break;
      } // Clear form errors on page change


      if (nextProps.page !== page) errors = {};
      this.setState({
        errors: errors
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          classes = _this$props.classes,
          firebase = _this$props.firebase,
          page = _this$props.page,
          showPassword = _this$props.showPassword,
          setPage = _this$props.setPage,
          setShowPassword = _this$props.setShowPassword,
          env = _this$props.env;
      var errors = this.state.errors;
      var animConfig = {
        stiffness: 480,
        damping: 48
      };
      var formOpen = page !== 'default';
      var emailLabel = 'Email address';

      if (page === 'default') {
        emailLabel = 'Continue with email';
      }

      var direction = env === 'DASHBOARD' ? DOWN : UP;

      var emailField = _react.default.createElement(_reduxForm.Field, {
        name: "email",
        component: _Text.default,
        componentProps: {
          label: emailLabel,
          error: errors.email,
          type: 'email',
          fullWidth: true,
          variant: 'filled',
          name: 'email',
          autocapitalization: 'none',
          autoComplete: 'email'
        }
      });

      var signupForm = function signupForm(style) {
        return _react.default.createElement("div", {
          className: classes && classes.background,
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            transform: "translate3d(0, ".concat(style.x * 129 * direction, "px, 0)")
          }
        }, _react.default.createElement("div", {
          className: classes && classes.background,
          style: {
            position: 'relative',
            zIndex: 70,
            transform: "translate3d(0, ".concat(style.x * 129 * (direction === DOWN ? 1 : 0), "px, 0)")
          }
        }, emailField), ['default', 'signUp'].includes(page) && _react.default.createElement("div", {
          style: {
            position: 'relative',
            display: 'flex',
            marginTop: 8,
            zIndex: 60
          }
        }, _react.default.createElement(_reduxForm.Field, {
          name: "firstName",
          component: _Text.default,
          componentProps: {
            label: 'First name',
            disabled: !formOpen,
            type: 'text',
            variant: 'filled',
            name: 'fname',
            autoFocus: true,
            autoComplete: 'given-name',
            autocapitalization: 'words',
            style: {
              marginRight: 4,
              flex: 1
            }
          }
        }), _react.default.createElement(_reduxForm.Field, {
          name: "lastName",
          component: _Text.default,
          componentProps: {
            label: 'Last name',
            disabled: !formOpen,
            type: 'text',
            variant: 'filled',
            name: 'lname',
            autoComplete: 'family-name',
            autocapitalization: 'words',
            style: {
              marginLeft: 4,
              flex: 1
            }
          }
        })), _react.default.createElement(_reactMotion.Motion, {
          defaultStyle: {
            x: 1
          },
          style: {
            x: (0, _reactMotion.spring)(page === 'forgotPassword' ? 0 : 1, animConfig)
          }
        }, function (style) {
          return _react.default.createElement("div", {
            style: {
              position: 'relative',
              zIndex: 60
            }
          }, _react.default.createElement("div", {
            ref: function ref(node) {
              _this2.socialSection = node;
            },
            style: {
              willChange: 'transform',
              overflow: 'hidden',
              opacity: Math.pow(style.x, 1 / 3),
              transformOrigin: 'top center',
              transform: "scale(1, ".concat(style.x, ") translate3d(0, 0, 0)")
            }
          }, _react.default.createElement("div", {
            ref: function ref(node) {
              _this2.socialSection = node;
            },
            style: {
              transformOrigin: 'top center',
              transform: "scale(1, ".concat(1 / style.x, ") translate3d(0, 0, 0)")
            }
          }, _react.default.createElement(_reduxForm.Field, {
            name: "password",
            component: _Text.default,
            meta: {
              error: errors.password
            },
            componentProps: {
              label: 'Password',
              style: {
                marginTop: 8
              },
              disabled: !formOpen,
              type: showPassword ? 'text' : 'password',
              fullWidth: true,
              variant: 'filled',
              name: 'password',
              autoComplete: page === 'signUp' ? 'new-password' : 'current-password',
              InputProps: {
                endAdornment: _react.default.createElement(_InputAdornment.default, {
                  position: "end"
                }, _react.default.createElement(_IconButton.default, {
                  disabled: !formOpen,
                  "aria-label": "Toggle password visibility",
                  onClick: function onClick() {
                    setShowPassword(!showPassword);
                  }
                }, _react.default.createElement(_materialUiToggleIcon.default, {
                  on: !showPassword,
                  onIcon: _react.default.createElement(_VisibilityRounded.default, null),
                  offIcon: _react.default.createElement(_VisibilityOffRounded.default, null)
                })))
              }
            }
          }))));
        }), ['forgotPassword', 'signIn'].includes(page) && _react.default.createElement(_Button.default, {
          variant: "outlined",
          className: "".concat(classes.uncapitalized, " ").concat(classes.transitionOpacity),
          onClick: function onClick() {
            return setPage('forgotPassword');
          },
          style: {
            position: 'relative',
            zIndex: 60,
            marginTop: 8,
            opacity: page === 'forgotPassword' ? 0 : 1
          }
        }, "Forgot password"));
      };

      var separator = _react.default.createElement("div", {
        style: {
          marginBottom: 16
        },
        className: classes && classes.flex
      }, _react.default.createElement(_Divider.default, {
        className: classes && classes.grow
      }), _react.default.createElement("div", {
        style: {
          height: 0,
          display: 'flex',
          alignItems: 'center'
        }
      }, _react.default.createElement(_Typography.default, {
        variant: "caption",
        component: "span",
        color: "textSecondary",
        style: {
          paddingLeft: 8,
          paddingRight: 8
        }
      }, "or")), _react.default.createElement(_Divider.default, {
        className: classes && classes.grow
      }));

      return _react.default.createElement(_reactMotion.Motion, {
        defaultStyle: {
          x: 1
        },
        style: {
          x: (0, _reactMotion.spring)(formOpen ? 0 : 1, animConfig)
        }
      }, function (style) {
        return _react.default.createElement("div", {
          style: {
            position: 'relative'
          }
        }, direction === DOWN && signupForm(style), _react.default.createElement("div", {
          style: {
            position: 'absolute',
            zIndex: 40,
            top: direction === DOWN ? 72 : 0,
            left: 0,
            right: 0,
            opacity: style.x
          }
        }, direction === DOWN && separator, _react.default.createElement("div", {
          style: {
            paddingBottom: 16
          }
        }, _react.default.createElement(_GoogleButton.default, {
          onClick: function onClick() {
            return firebase.login({
              provider: 'google',
              type: 'popup'
            });
          }
        })), _react.default.createElement("div", {
          style: {
            paddingBottom: 16
          }
        }, _react.default.createElement(_FacebookButton.default, {
          onClick: function onClick() {
            return firebase.login({
              provider: 'facebook',
              type: 'popup'
            });
          }
        })), direction === UP && separator), direction === UP && signupForm(style));
      });
    }
  }]);

  return Fields;
}(_react.default.Component);

var _default = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactReduxFirebase.firebaseConnect)(), (0, _reactRedux.connect)(function (state) {
  return {
    authError: state.firebase.authError,
    page: state.auth.page,
    showPassword: state.auth.showPassword
  };
}, {
  setPage: _actions.setPage,
  setShowPassword: _actions.setShowPassword,
  openDialog: _actions2.openDialog
}))(Fields);

exports.default = _default;