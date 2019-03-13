"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = _interopRequireDefault(require("./en/app.json"));

var _common = _interopRequireDefault(require("./en/common.json"));

var _app2 = _interopRequireDefault(require("./es/app.json"));

var _common2 = _interopRequireDefault(require("./es/common.json"));

var _app3 = _interopRequireDefault(require("./hu/app.json"));

var _common3 = _interopRequireDefault(require("./hu/common.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: come up with a more dynamic solution (?)
var _default = {
  en: {
    app: _app.default,
    common: _common.default
  },
  es: {
    app: _app2.default,
    common: _common2.default
  },
  hu: {
    app: _app3.default,
    common: _common3.default
  }
};
exports.default = _default;