"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(theme) {
  var _padded, _paddedNarrow;

  return {
    paddedAppbar: {
      paddingTop: theme.mixins.toolbar.offsetHeight
    },
    padded: (_padded = {
      paddingLeft: theme.spacing.unit * 15,
      paddingRight: theme.spacing.unit * 15
    }, _defineProperty(_padded, theme.breakpoints.down('sm'), {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 8
    }), _defineProperty(_padded, theme.breakpoints.down('xs'), {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }), _padded),
    paddedNarrow: (_paddedNarrow = {
      paddingTop: theme.spacing.unit * 9,
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }, _defineProperty(_paddedNarrow, theme.breakpoints.down('md'), {
      paddingRight: theme.spacing.unit * 3
    }), _defineProperty(_paddedNarrow, theme.breakpoints.down('xs'), {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }), _paddedNarrow)
  };
};

var ResponsiveContainer = function ResponsiveContainer(_ref) {
  var classes = _ref.classes,
      children = _ref.children,
      fixedAppBar = _ref.fixedAppBar,
      narrow = _ref.narrow,
      style = _ref.style;
  return _react.default.createElement("div", {
    style: style,
    className: (0, _classnames.default)(narrow ? classes.paddedNarrow : classes.padded, fixedAppBar ? classes.paddedAppbar : null)
  }, children);
};

var _default = (0, _styles.withStyles)(styles)(ResponsiveContainer);

exports.default = _default;