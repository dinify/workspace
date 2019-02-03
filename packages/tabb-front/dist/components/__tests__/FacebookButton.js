"use strict";

var _FacebookButton = _interopRequireDefault(require("components/FacebookButton"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it('renders without crashing', function () {
  var div = document.createElement('div');

  _reactDom.default.render(_react.default.createElement(_FacebookButton.default, null), div);
});