"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _flags = _interopRequireDefault(require("../icons/flags"));

var _PublicRounded = _interopRequireDefault(require("@material-ui/icons/PublicRounded"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      borderRadius: 3,
      overflow: 'hidden',
      border: "1px solid ".concat(theme.palette.divider),
      marginLeft: 1
    }
  };
};

var Flag = function Flag(_ref) {
  var classes = _ref.classes,
      _ref$country = _ref.country,
      country = _ref$country === void 0 ? 'us' : _ref$country;
  var flag = _flags.default[country];
  if (!flag) return _react.default.createElement(_PublicRounded.default, {
    style: {
      opacity: 0.54
    }
  });
  return _react.default.createElement("img", {
    alt: country,
    className: classes.root,
    src: flag
  });
};

var _default = (0, _styles.withStyles)(styles)(Flag);

exports.default = _default;