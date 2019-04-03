"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInstalled = isInstalled;
exports.parseLanguages = parseLanguages;
exports.formatPrice = formatPrice;
exports.isMobile = isMobile;
exports.isTouchMobile = isTouchMobile;
exports.supportsScrollSnap = supportsScrollSnap;
exports.getPlatform = getPlatform;
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.getInitials = getInitials;
exports.UpdateOriginal = exports.MapPath = exports.Identity = exports.ListToMap = exports.MapToList = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _numeral = _interopRequireDefault(require("numeral"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MapToList = function MapToList(items) {
  return R.toPairs(items).map(function (pair) {
    return _objectSpread({
      id: pair[0]
    }, pair[1]);
  }).sort(function (a, b) {
    return b.id.localeCompare(a.id, 'en');
  });
};

exports.MapToList = MapToList;

var ListToMap = function ListToMap(items) {
  var obj = {};
  items.forEach(function (item) {
    obj[item.id] = item;
  });
  return obj;
};

exports.ListToMap = ListToMap;

var Identity = function Identity(val, cb) {
  return cb(val);
};

exports.Identity = Identity;

function isInstalled() {
  var url = window.location.search;
  var getQuery = url.split('?')[1];
  if (!getQuery) return false;
  var params = getQuery.split('&');

  for (var i = 0; i < params.length; i += 1) {
    var s = params[i].split('=');
    if (s[0] === 'source' && s[1] === 'pwa') return true;
  }

  return false;
}

var MapPath = R.curry(function (path, f, obj) {
  return R.assocPath(path, f(R.path(path, obj)), obj);
});
exports.MapPath = MapPath;

var UpdateOriginal = function UpdateOriginal(originalMap, actual) {
  // always keep original keys
  var actualMap = actual;
  MapToList(originalMap).forEach(function (o) {
    if (actualMap[o.id]) {
      R.keys(o).forEach(function (originalKey) {
        if (actualMap[o.id][originalKey] === undefined) {
          actualMap[o.id][originalKey] = o[originalKey];
        }
      });
    }
  });
  return actualMap;
};

exports.UpdateOriginal = UpdateOriginal;

function parseLanguages(languages) {
  return languages.map(function (lang) {
    var countries = lang[3].map(function (c) {
      return {
        langtag: c[0],
        // BCP 47    "en-US"
        regionCode: c[0].split('-')[c[0].split('-').length - 1],
        // ISO 3166-1 (alpha-2) or UN M.49    "US"
        nameNative: c[1]
      };
    });
    return {
      code: lang[0],
      // ISO 639-1 or ISO 639-2    "en"
      name: lang[1],
      nameNative: lang[2],
      countries: countries
    };
  });
}

function getUA() {
  return navigator.userAgent || navigator.vendor || window.opera;
}

function formatPrice(price) {
  var displayCurrencies = {
    KWD: 'KD'
  };
  var formatAmount = {
    KWD: function KWD(amount) {
      return (0, _numeral.default)(amount).format('0.000');
    }
  };
  var amount = Math.ceil(price.amount * 1000) / 1000;
  return "".concat(formatAmount[price.currency](amount), " ").concat(displayCurrencies[price.currency]);
  /* const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 3,
  });
   return formatter.format(price.amount); */
}

function isMobile(ua) {
  if (!ua && typeof navigator !== 'undefined') ua = getUA();

  if (ua && ua.headers && typeof ua.headers['user-agent'] === 'string') {
    ua = ua.headers['user-agent'];
  }

  if (typeof ua !== 'string') return false;
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(ua.substr(0, 4));
}

function isTouchMobile(ua) {
  return isMobile(ua) && 'ontouchstart' in global;
}

function supportsScrollSnap() {
  return 'scrollSnapType' in document.documentElement.style || 'webkitScrollSnapType' in document.documentElement.style;
}
/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'other'.
 *
 * @returns {String}
 */


function getPlatform() {
  var userAgent = getUA();

  if (isMobile(userAgent)) {
    // Windows Phone must come first because its UA also contains 'Android'

    /* if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone';
    } */
    // Treat WP as if it were Android
    if (/android/i.test(userAgent)) {
      return 'android';
    } // iOS detection from: http://stackoverflow.com/a/9039885/177710


    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'ios';
    }

    return 'mobile';
  }

  return 'desktop';
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=".concat(d.toUTCString());
  document.cookie = "".concat(cname, "=").concat(cvalue, ";").concat(expires, ";path=/");
}

function getCookie(cname) {
  var name = "".concat(cname, "=");
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i += 1) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }

  return '';
}

function getInitials() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var glue = arguments.length > 1 ? arguments[1] : undefined;
  if (str === '') return '';
  if (typeof glue === "undefined") glue = true;
  var initials = str.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
  if (glue) return initials.join('');
  return initials;
}

;