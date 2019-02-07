"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authEpics", {
  enumerable: true,
  get: function get() {
    return _epics.default;
  }
});
Object.defineProperty(exports, "authTypes", {
  enumerable: true,
  get: function get() {
    return _types.default;
  }
});
exports.default = void 0;

var _reducers = _interopRequireDefault(require("./reducers"));

var _epics = _interopRequireDefault(require("./epics"));

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _reducers.default;
exports.default = _default;