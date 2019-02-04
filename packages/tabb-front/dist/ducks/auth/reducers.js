"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _ramda = _interopRequireDefault(require("ramda"));

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  page: 'default',
  showPassword: false,
  linkProviders: false,
  credential: {}
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.default.SET_PAGE:
      {
        return _ramda.default.assoc('page', action.payload)(state);
      }

    case _types.default.SET_SHOWPASSWORD:
      {
        return _ramda.default.assoc('showPassword', action.payload)(state);
      }

    case _types.default.SET_LINKPROVIDERS:
      {
        var _action$payload = action.payload,
            credential = _action$payload.credential,
            linkProviders = _action$payload.linkProviders;

        var newState = _ramda.default.assoc('credential', credential)(state);

        return _ramda.default.assoc('linkProviders', linkProviders)(newState);
      }

    default:
      return state;
  }
}