"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.epics = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _api = _interopRequireDefault(require("../api"));

var R = _interopRequireWildcard(require("ramda"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var capitalize = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var camel = function camel(str) {
  return capitalize(str.toLowerCase());
};

var withoutPath = function withoutPath(type) {
  return type.match(/\w+(?:\.\w+)*$/g)[0];
};

var getSubjectAndPath = function getSubjectAndPath(type, kind, stage) {
  var typeWithoutPath = withoutPath(type);
  return {
    subject: typeWithoutPath.replace("".concat(kind, "_"), '').replace("_".concat(stage), ''),
    path: type.replace(typeWithoutPath, '')
  };
};

var filterAction = function filterAction(type, kind, stage) {
  var typeOnly = withoutPath(type);
  return typeOnly.startsWith("".concat(kind, "_")) && typeOnly.endsWith("_".concat(stage));
};

var createEpic = function createEpic(action$, state$) {
  return action$.pipe((0, _operators.filter)(function (action) {
    return filterAction(action.type, 'CREATE', 'INIT');
  }), (0, _operators.mergeMap)(function (_ref) {
    var _ref$payload = _ref.payload,
        payload = _ref$payload === void 0 ? {} : _ref$payload,
        type = _ref.type;

    var _getSubjectAndPath = getSubjectAndPath(type, 'CREATE', 'INIT'),
        subject = _getSubjectAndPath.subject,
        path = _getSubjectAndPath.path;

    var apiFnName = "Create".concat(camel(subject));
    var state = state$.value;

    if (state.restaurant && state.restaurant.selectedRestaurant) {
      payload.restaurantId = state.restaurant.selectedRestaurant;
    }

    return (0, _rxjs.from)(_api.default[apiFnName](payload)).pipe((0, _operators.map)(function (res) {
      return {
        type: "".concat(path, "CREATE_").concat(subject, "_DONE"),
        payload: {
          res: res,
          prePayload: payload
        }
      };
    }), (0, _operators.catchError)(function (error) {
      return (0, _rxjs.of)({
        type: "".concat(path, "CREATE_").concat(subject, "_FAIL"),
        payload: error,
        error: true
      });
    }));
  }));
};

var fetchEpic = function fetchEpic(action$, state$) {
  return action$.pipe((0, _operators.filter)(function (action) {
    return filterAction(action.type, 'FETCH', 'INIT');
  }), (0, _operators.mergeMap)(function (_ref2) {
    var _ref2$payload = _ref2.payload,
        payload = _ref2$payload === void 0 ? {} : _ref2$payload,
        type = _ref2.type;

    var _getSubjectAndPath2 = getSubjectAndPath(type, 'FETCH', 'INIT'),
        subject = _getSubjectAndPath2.subject,
        path = _getSubjectAndPath2.path;

    var apiFnName = "Get".concat(camel(subject));
    var state = state$.value;

    if (state.restaurant && state.restaurant.selectedRestaurant) {
      payload.restaurantId = state.restaurant.selectedRestaurant;
    }

    return (0, _rxjs.from)(_api.default[apiFnName](payload)).pipe((0, _operators.map)(function (res) {
      return {
        type: "".concat(path, "FETCH_").concat(subject, "_DONE"),
        payload: {
          res: res,
          prePayload: payload
        }
      };
    }), (0, _operators.catchError)(function (error) {
      return (0, _rxjs.of)({
        type: "".concat(path, "FETCH_").concat(subject, "_FAIL"),
        payload: error,
        error: true
      });
    }));
  }));
};

var fetchAllEpic = function fetchAllEpic(action$, state$) {
  return action$.pipe((0, _operators.filter)(function (action) {
    return filterAction(action.type, 'FETCHALL', 'INIT');
  }), (0, _operators.mergeMap)(function (_ref3) {
    var payload = _ref3.payload,
        type = _ref3.type;

    var _getSubjectAndPath3 = getSubjectAndPath(type, 'FETCHALL', 'INIT'),
        subject = _getSubjectAndPath3.subject,
        path = _getSubjectAndPath3.path;

    var ids = payload.ids;

    if (payload.cache) {
      var storeKey = subject.toLowerCase();
      var all = state$.value[storeKey].all;
      ids = R.filter(function (id) {
        return !all[id];
      }, ids);
    }

    return ids.map(function (id) {
      return {
        type: "".concat(path, "FETCH_").concat(subject, "_INIT"),
        payload: {
          id: id
        }
      };
    }).concat({
      type: "".concat(path, "FETCHALL_").concat(subject, "_DONE")
    });
  }));
};

var updateEpic = function updateEpic(action$, state$) {
  return action$.pipe((0, _operators.filter)(function (action) {
    return filterAction(action.type, 'UPDATE', 'INIT');
  }), (0, _operators.mergeMap)(function (_ref4) {
    var _ref4$payload = _ref4.payload,
        payload = _ref4$payload === void 0 ? {} : _ref4$payload,
        type = _ref4.type;

    var _getSubjectAndPath4 = getSubjectAndPath(type, 'UPDATE', 'INIT'),
        subject = _getSubjectAndPath4.subject,
        path = _getSubjectAndPath4.path;

    var apiFnName = "Change".concat(camel(subject));
    var state = state$.value;

    if (state.restaurant && state.restaurant.selectedRestaurant) {
      payload.restaurantId = state.restaurant.selectedRestaurant;
    }

    return (0, _rxjs.from)(_api.default[apiFnName](payload)).pipe((0, _operators.map)(function (res) {
      return {
        type: "".concat(path, "UPDATE_").concat(subject, "_DONE"),
        payload: {
          res: res,
          prePayload: payload
        }
      };
    }), (0, _operators.catchError)(function (error) {
      return (0, _rxjs.of)({
        type: "".concat(path, "UPDATE_").concat(subject, "_FAIL"),
        payload: error,
        error: true
      });
    }));
  }));
};

var removeEpic = function removeEpic(action$, state$) {
  return action$.pipe((0, _operators.filter)(function (action) {
    return filterAction(action.type, 'REMOVE', 'INIT');
  }), (0, _operators.mergeMap)(function (_ref5) {
    var _ref5$payload = _ref5.payload,
        payload = _ref5$payload === void 0 ? {} : _ref5$payload,
        type = _ref5.type;

    var _getSubjectAndPath5 = getSubjectAndPath(type, 'REMOVE', 'INIT'),
        subject = _getSubjectAndPath5.subject,
        path = _getSubjectAndPath5.path;

    var apiFnName = "Remove".concat(camel(subject));
    var state = state$.value;

    if (state.restaurant && state.restaurant.selectedRestaurant) {
      payload.restaurantId = state.restaurant.selectedRestaurant;
    }

    return (0, _rxjs.from)(_api.default[apiFnName](payload)).pipe((0, _operators.map)(function (res) {
      return {
        type: "".concat(path, "REMOVE_").concat(subject, "_DONE"),
        payload: {
          res: res,
          prePayload: payload
        }
      };
    }), (0, _operators.catchError)(function (error) {
      return (0, _rxjs.of)({
        type: "".concat(path, "REMOVE_").concat(subject, "_FAIL"),
        payload: error,
        error: true
      });
    }));
  }));
};

var epics = [createEpic, fetchEpic, fetchAllEpic, updateEpic, removeEpic];
exports.epics = epics;