"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Avatar = _interopRequireDefault(require("@material-ui/core/Avatar"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemAvatar = _interopRequireDefault(require("@material-ui/core/ListItemAvatar"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _CreditCardRounded = _interopRequireDefault(require("@material-ui/icons/CreditCardRounded"));

var _PublicRounded = _interopRequireDefault(require("@material-ui/icons/PublicRounded"));

var _AccountBalanceWalletRounded = _interopRequireDefault(require("@material-ui/icons/AccountBalanceWalletRounded"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var options = [{
  name: 'Cash',
  icon: _react.default.createElement(_AccountBalanceWalletRounded.default, null),
  index: 0,
  type: 'CASH'
}, {
  name: 'Card',
  icon: _react.default.createElement(_CreditCardRounded.default, null),
  index: 1,
  type: 'CARD'
}, {
  name: 'Online (coming soon)',
  icon: _react.default.createElement(_PublicRounded.default, null),
  index: 2,
  disabled: true,
  type: 'ONLINE'
}];

var styles = function styles(theme) {
  return {
    avatar: {
      backgroundColor: theme.palette.primary.main
    }
  };
};

var PaymentOptionsDialog =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PaymentOptionsDialog, _React$Component);

  function PaymentOptionsDialog() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PaymentOptionsDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PaymentOptionsDialog)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      _this.props.onClose(null);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleListItemClick", function (value) {
      _this.props.onClose(value);
    });

    return _this;
  }

  _createClass(PaymentOptionsDialog, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          classes = _this$props.classes,
          onClose = _this$props.onClose,
          other = _objectWithoutProperties(_this$props, ["classes", "onClose"]);

      return _react.default.createElement(_Dialog.default, _extends({
        onClose: this.handleClose,
        "aria-labelledby": "payment-options-dialog"
      }, other), _react.default.createElement(_DialogTitle.default, {
        id: "payment-options-dialog"
      }, "Select payment option"), _react.default.createElement("div", null, _react.default.createElement(_List.default, null, options.map(function (option) {
        return _react.default.createElement(_ListItem.default, {
          button: true,
          disabled: option.disabled,
          onClick: function onClick() {
            return _this2.handleListItemClick(option);
          },
          key: option.index
        }, _react.default.createElement(_ListItemAvatar.default, null, _react.default.createElement(_Avatar.default, {
          className: classes.avatar
        }, option.icon)), _react.default.createElement(_ListItemText.default, {
          primary: option.name
        }));
      }))));
    }
  }]);

  return PaymentOptionsDialog;
}(_react.default.Component);

var _default = (0, _styles.withStyles)(styles)(PaymentOptionsDialog);

exports.default = _default;