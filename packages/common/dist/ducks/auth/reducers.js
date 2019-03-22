"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var R = _interopRequireWildcard(require("ramda"));

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
        return R.assoc('page', action.payload)(state);
      }

    case _types.default.SET_SHOWPASSWORD:
      {
        return R.assoc('showPassword', action.payload)(state);
      }

    case _types.default.SET_LINKPROVIDERS:
      {
        var _action$payload = action.payload,
            credential = _action$payload.credential,
            linkProviders = _action$payload.linkProviders;
        var newState = R.assoc('credential', credential)(state);
        return R.assoc('linkProviders', linkProviders)(newState);
      }

    default:
      return state;
  }
}