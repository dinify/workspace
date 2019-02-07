"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _addonLinks = require("@storybook/addon-links");

var _demo = require("@storybook/react/demo");

var _FacebookButton = _interopRequireDefault(require("components/FacebookButton"));

var _GoogleButton = _interopRequireDefault(require("components/GoogleButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)('Buttons', module).add('FacebookButton', function () {
  return _react.default.createElement(_FacebookButton.default, null);
}).add('GoogleButton', function () {
  return _react.default.createElement(_GoogleButton.default, null);
});
(0, _react2.storiesOf)('Button', module).add('with text', function () {
  return _react.default.createElement(_demo.Button, {
    onClick: (0, _addonActions.action)('clicked')
  }, "Hello Button");
}).add('with some emoji', function () {
  return _react.default.createElement(_demo.Button, {
    onClick: (0, _addonActions.action)('clicked')
  }, _react.default.createElement("span", {
    role: "img",
    "aria-label": "so cool"
  }, "\uD83D\uDE00 \uD83D\uDE0E \uD83D\uDC4D \uD83D\uDCAF"));
});