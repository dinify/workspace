"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleTheme = exports.closeDialog = exports.openDialog = void 0;

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openDialog = function openDialog(e) {
  return {
    type: _types.default.DIALOG_OPEN,
    payload: e
  };
};

exports.openDialog = openDialog;

var closeDialog = function closeDialog(e) {
  return {
    type: _types.default.DIALOG_CLOSE,
    payload: e
  };
};

exports.closeDialog = closeDialog;

var toggleTheme = function toggleTheme(e) {
  return {
    type: _types.default.TOGGLE_THEME,
    payload: e
  };
};

exports.toggleTheme = toggleTheme;