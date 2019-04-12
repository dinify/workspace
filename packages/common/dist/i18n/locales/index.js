"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = _interopRequireDefault(require("./af/app.json"));

var _common = _interopRequireDefault(require("./af/common.json"));

var _app2 = _interopRequireDefault(require("./sq/app.json"));

var _common2 = _interopRequireDefault(require("./sq/common.json"));

var _app3 = _interopRequireDefault(require("./am/app.json"));

var _common3 = _interopRequireDefault(require("./am/common.json"));

var _app4 = _interopRequireDefault(require("./ar/app.json"));

var _common4 = _interopRequireDefault(require("./ar/common.json"));

var _app5 = _interopRequireDefault(require("./hy/app.json"));

var _common5 = _interopRequireDefault(require("./hy/common.json"));

var _app6 = _interopRequireDefault(require("./az/app.json"));

var _common6 = _interopRequireDefault(require("./az/common.json"));

var _app7 = _interopRequireDefault(require("./eu/app.json"));

var _common7 = _interopRequireDefault(require("./eu/common.json"));

var _app8 = _interopRequireDefault(require("./be/app.json"));

var _common8 = _interopRequireDefault(require("./be/common.json"));

var _app9 = _interopRequireDefault(require("./bn/app.json"));

var _common9 = _interopRequireDefault(require("./bn/common.json"));

var _app10 = _interopRequireDefault(require("./bs/app.json"));

var _common10 = _interopRequireDefault(require("./bs/common.json"));

var _app11 = _interopRequireDefault(require("./bg/app.json"));

var _common11 = _interopRequireDefault(require("./bg/common.json"));

var _app12 = _interopRequireDefault(require("./ca/app.json"));

var _common12 = _interopRequireDefault(require("./ca/common.json"));

var _app13 = _interopRequireDefault(require("./ceb/app.json"));

var _common13 = _interopRequireDefault(require("./ceb/common.json"));

var _app14 = _interopRequireDefault(require("./zh-Hans/app.json"));

var _common14 = _interopRequireDefault(require("./zh-Hans/common.json"));

var _app15 = _interopRequireDefault(require("./zh-Hant/app.json"));

var _common15 = _interopRequireDefault(require("./zh-Hant/common.json"));

var _app16 = _interopRequireDefault(require("./co/app.json"));

var _common16 = _interopRequireDefault(require("./co/common.json"));

var _app17 = _interopRequireDefault(require("./hr/app.json"));

var _common17 = _interopRequireDefault(require("./hr/common.json"));

var _app18 = _interopRequireDefault(require("./cs/app.json"));

var _common18 = _interopRequireDefault(require("./cs/common.json"));

var _dashboard = _interopRequireDefault(require("./cs/dashboard.json"));

var _app19 = _interopRequireDefault(require("./da/app.json"));

var _common19 = _interopRequireDefault(require("./da/common.json"));

var _app20 = _interopRequireDefault(require("./nl/app.json"));

var _common20 = _interopRequireDefault(require("./nl/common.json"));

var _app21 = _interopRequireDefault(require("./en/app.json"));

var _common21 = _interopRequireDefault(require("./en/common.json"));

var _dashboard2 = _interopRequireDefault(require("./en/dashboard.json"));

var _app22 = _interopRequireDefault(require("./eo/app.json"));

var _common22 = _interopRequireDefault(require("./eo/common.json"));

var _app23 = _interopRequireDefault(require("./et/app.json"));

var _common23 = _interopRequireDefault(require("./et/common.json"));

var _app24 = _interopRequireDefault(require("./fi/app.json"));

var _common24 = _interopRequireDefault(require("./fi/common.json"));

var _app25 = _interopRequireDefault(require("./fr/app.json"));

var _common25 = _interopRequireDefault(require("./fr/common.json"));

var _app26 = _interopRequireDefault(require("./fy/app.json"));

var _common26 = _interopRequireDefault(require("./fy/common.json"));

var _app27 = _interopRequireDefault(require("./gl/app.json"));

var _common27 = _interopRequireDefault(require("./gl/common.json"));

var _app28 = _interopRequireDefault(require("./ka/app.json"));

var _common28 = _interopRequireDefault(require("./ka/common.json"));

var _app29 = _interopRequireDefault(require("./de/app.json"));

var _common29 = _interopRequireDefault(require("./de/common.json"));

var _app30 = _interopRequireDefault(require("./el/app.json"));

var _common30 = _interopRequireDefault(require("./el/common.json"));

var _app31 = _interopRequireDefault(require("./gu/app.json"));

var _common31 = _interopRequireDefault(require("./gu/common.json"));

var _app32 = _interopRequireDefault(require("./ht/app.json"));

var _common32 = _interopRequireDefault(require("./ht/common.json"));

var _app33 = _interopRequireDefault(require("./ha/app.json"));

var _common33 = _interopRequireDefault(require("./ha/common.json"));

var _app34 = _interopRequireDefault(require("./haw/app.json"));

var _common34 = _interopRequireDefault(require("./haw/common.json"));

var _app35 = _interopRequireDefault(require("./he/app.json"));

var _common35 = _interopRequireDefault(require("./he/common.json"));

var _app36 = _interopRequireDefault(require("./hi/app.json"));

var _common36 = _interopRequireDefault(require("./hi/common.json"));

var _app37 = _interopRequireDefault(require("./hmn/app.json"));

var _common37 = _interopRequireDefault(require("./hmn/common.json"));

var _app38 = _interopRequireDefault(require("./hu/app.json"));

var _common38 = _interopRequireDefault(require("./hu/common.json"));

var _app39 = _interopRequireDefault(require("./is/app.json"));

var _common39 = _interopRequireDefault(require("./is/common.json"));

var _app40 = _interopRequireDefault(require("./ig/app.json"));

var _common40 = _interopRequireDefault(require("./ig/common.json"));

var _app41 = _interopRequireDefault(require("./id/app.json"));

var _common41 = _interopRequireDefault(require("./id/common.json"));

var _app42 = _interopRequireDefault(require("./ga/app.json"));

var _common42 = _interopRequireDefault(require("./ga/common.json"));

var _app43 = _interopRequireDefault(require("./it/app.json"));

var _common43 = _interopRequireDefault(require("./it/common.json"));

var _app44 = _interopRequireDefault(require("./ja/app.json"));

var _common44 = _interopRequireDefault(require("./ja/common.json"));

var _app45 = _interopRequireDefault(require("./jv/app.json"));

var _common45 = _interopRequireDefault(require("./jv/common.json"));

var _app46 = _interopRequireDefault(require("./kn/app.json"));

var _common46 = _interopRequireDefault(require("./kn/common.json"));

var _app47 = _interopRequireDefault(require("./kk/app.json"));

var _common47 = _interopRequireDefault(require("./kk/common.json"));

var _app48 = _interopRequireDefault(require("./km/app.json"));

var _common48 = _interopRequireDefault(require("./km/common.json"));

var _app49 = _interopRequireDefault(require("./ko/app.json"));

var _common49 = _interopRequireDefault(require("./ko/common.json"));

var _app50 = _interopRequireDefault(require("./ku/app.json"));

var _common50 = _interopRequireDefault(require("./ku/common.json"));

var _app51 = _interopRequireDefault(require("./ky/app.json"));

var _common51 = _interopRequireDefault(require("./ky/common.json"));

var _app52 = _interopRequireDefault(require("./lo/app.json"));

var _common52 = _interopRequireDefault(require("./lo/common.json"));

var _app53 = _interopRequireDefault(require("./la/app.json"));

var _common53 = _interopRequireDefault(require("./la/common.json"));

var _app54 = _interopRequireDefault(require("./lv/app.json"));

var _common54 = _interopRequireDefault(require("./lv/common.json"));

var _app55 = _interopRequireDefault(require("./lt/app.json"));

var _common55 = _interopRequireDefault(require("./lt/common.json"));

var _app56 = _interopRequireDefault(require("./lb/app.json"));

var _common56 = _interopRequireDefault(require("./lb/common.json"));

var _app57 = _interopRequireDefault(require("./mk/app.json"));

var _common57 = _interopRequireDefault(require("./mk/common.json"));

var _app58 = _interopRequireDefault(require("./mg/app.json"));

var _common58 = _interopRequireDefault(require("./mg/common.json"));

var _app59 = _interopRequireDefault(require("./ms/app.json"));

var _common59 = _interopRequireDefault(require("./ms/common.json"));

var _app60 = _interopRequireDefault(require("./ml/app.json"));

var _common60 = _interopRequireDefault(require("./ml/common.json"));

var _app61 = _interopRequireDefault(require("./mt/app.json"));

var _common61 = _interopRequireDefault(require("./mt/common.json"));

var _app62 = _interopRequireDefault(require("./mi/app.json"));

var _common62 = _interopRequireDefault(require("./mi/common.json"));

var _app63 = _interopRequireDefault(require("./mr/app.json"));

var _common63 = _interopRequireDefault(require("./mr/common.json"));

var _app64 = _interopRequireDefault(require("./mn/app.json"));

var _common64 = _interopRequireDefault(require("./mn/common.json"));

var _app65 = _interopRequireDefault(require("./my/app.json"));

var _common65 = _interopRequireDefault(require("./my/common.json"));

var _app66 = _interopRequireDefault(require("./ne/app.json"));

var _common66 = _interopRequireDefault(require("./ne/common.json"));

var _app67 = _interopRequireDefault(require("./nb/app.json"));

var _common67 = _interopRequireDefault(require("./nb/common.json"));

var _app68 = _interopRequireDefault(require("./ny/app.json"));

var _common68 = _interopRequireDefault(require("./ny/common.json"));

var _app69 = _interopRequireDefault(require("./ps/app.json"));

var _common69 = _interopRequireDefault(require("./ps/common.json"));

var _app70 = _interopRequireDefault(require("./fa/app.json"));

var _common70 = _interopRequireDefault(require("./fa/common.json"));

var _app71 = _interopRequireDefault(require("./pl/app.json"));

var _common71 = _interopRequireDefault(require("./pl/common.json"));

var _app72 = _interopRequireDefault(require("./pt/app.json"));

var _common72 = _interopRequireDefault(require("./pt/common.json"));

var _app73 = _interopRequireDefault(require("./pa/app.json"));

var _common73 = _interopRequireDefault(require("./pa/common.json"));

var _app74 = _interopRequireDefault(require("./ro/app.json"));

var _common74 = _interopRequireDefault(require("./ro/common.json"));

var _app75 = _interopRequireDefault(require("./ru/app.json"));

var _common75 = _interopRequireDefault(require("./ru/common.json"));

var _app76 = _interopRequireDefault(require("./sm/app.json"));

var _common76 = _interopRequireDefault(require("./sm/common.json"));

var _app77 = _interopRequireDefault(require("./gd/app.json"));

var _common77 = _interopRequireDefault(require("./gd/common.json"));

var _app78 = _interopRequireDefault(require("./sr/app.json"));

var _common78 = _interopRequireDefault(require("./sr/common.json"));

var _app79 = _interopRequireDefault(require("./st/app.json"));

var _common79 = _interopRequireDefault(require("./st/common.json"));

var _app80 = _interopRequireDefault(require("./sn/app.json"));

var _common80 = _interopRequireDefault(require("./sn/common.json"));

var _app81 = _interopRequireDefault(require("./sd/app.json"));

var _common81 = _interopRequireDefault(require("./sd/common.json"));

var _app82 = _interopRequireDefault(require("./si/app.json"));

var _common82 = _interopRequireDefault(require("./si/common.json"));

var _app83 = _interopRequireDefault(require("./sk/app.json"));

var _common83 = _interopRequireDefault(require("./sk/common.json"));

var _app84 = _interopRequireDefault(require("./sl/app.json"));

var _common84 = _interopRequireDefault(require("./sl/common.json"));

var _app85 = _interopRequireDefault(require("./so/app.json"));

var _common85 = _interopRequireDefault(require("./so/common.json"));

var _app86 = _interopRequireDefault(require("./es/app.json"));

var _common86 = _interopRequireDefault(require("./es/common.json"));

var _app87 = _interopRequireDefault(require("./su/app.json"));

var _common87 = _interopRequireDefault(require("./su/common.json"));

var _app88 = _interopRequireDefault(require("./sw/app.json"));

var _common88 = _interopRequireDefault(require("./sw/common.json"));

var _app89 = _interopRequireDefault(require("./sv/app.json"));

var _common89 = _interopRequireDefault(require("./sv/common.json"));

var _app90 = _interopRequireDefault(require("./fil/app.json"));

var _common90 = _interopRequireDefault(require("./fil/common.json"));

var _app91 = _interopRequireDefault(require("./tg/app.json"));

var _common91 = _interopRequireDefault(require("./tg/common.json"));

var _app92 = _interopRequireDefault(require("./ta/app.json"));

var _common92 = _interopRequireDefault(require("./ta/common.json"));

var _app93 = _interopRequireDefault(require("./te/app.json"));

var _common93 = _interopRequireDefault(require("./te/common.json"));

var _app94 = _interopRequireDefault(require("./th/app.json"));

var _common94 = _interopRequireDefault(require("./th/common.json"));

var _app95 = _interopRequireDefault(require("./tr/app.json"));

var _common95 = _interopRequireDefault(require("./tr/common.json"));

var _app96 = _interopRequireDefault(require("./uk/app.json"));

var _common96 = _interopRequireDefault(require("./uk/common.json"));

var _app97 = _interopRequireDefault(require("./ur/app.json"));

var _common97 = _interopRequireDefault(require("./ur/common.json"));

var _app98 = _interopRequireDefault(require("./uz/app.json"));

var _common98 = _interopRequireDefault(require("./uz/common.json"));

var _app99 = _interopRequireDefault(require("./vi/app.json"));

var _common99 = _interopRequireDefault(require("./vi/common.json"));

var _app100 = _interopRequireDefault(require("./cy/app.json"));

var _common100 = _interopRequireDefault(require("./cy/common.json"));

var _app101 = _interopRequireDefault(require("./xh/app.json"));

var _common101 = _interopRequireDefault(require("./xh/common.json"));

var _app102 = _interopRequireDefault(require("./yi/app.json"));

var _common102 = _interopRequireDefault(require("./yi/common.json"));

var _app103 = _interopRequireDefault(require("./yo/app.json"));

var _common103 = _interopRequireDefault(require("./yo/common.json"));

var _app104 = _interopRequireDefault(require("./zu/app.json"));

var _common104 = _interopRequireDefault(require("./zu/common.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: ccode split into separate bundles
// come up with a more dynamic solution (?)
var _default = {
  'af': {
    app: _app.default,
    common: _common.default
  },
  'sq': {
    app: _app2.default,
    common: _common2.default
  },
  'am': {
    app: _app3.default,
    common: _common3.default
  },
  'ar': {
    app: _app4.default,
    common: _common4.default
  },
  'hy': {
    app: _app5.default,
    common: _common5.default
  },
  'az': {
    app: _app6.default,
    common: _common6.default
  },
  'eu': {
    app: _app7.default,
    common: _common7.default
  },
  'be': {
    app: _app8.default,
    common: _common8.default
  },
  'bn': {
    app: _app9.default,
    common: _common9.default
  },
  'bs': {
    app: _app10.default,
    common: _common10.default
  },
  'bg': {
    app: _app11.default,
    common: _common11.default
  },
  'ca': {
    app: _app12.default,
    common: _common12.default
  },
  'ceb': {
    app: _app13.default,
    common: _common13.default
  },
  'zh-Hans': {
    app: _app14.default,
    common: _common14.default
  },
  'zh-Hant': {
    app: _app15.default,
    common: _common15.default
  },
  'co': {
    app: _app16.default,
    common: _common16.default
  },
  'hr': {
    app: _app17.default,
    common: _common17.default
  },
  'cs': {
    app: _app18.default,
    common: _common18.default,
    dashboard: _dashboard.default
  },
  'da': {
    app: _app19.default,
    common: _common19.default
  },
  'nl': {
    app: _app20.default,
    common: _common20.default
  },
  'en': {
    app: _app21.default,
    common: _common21.default,
    dashboard: _dashboard2.default
  },
  'eo': {
    app: _app22.default,
    common: _common22.default
  },
  'et': {
    app: _app23.default,
    common: _common23.default
  },
  'fi': {
    app: _app24.default,
    common: _common24.default
  },
  'fr': {
    app: _app25.default,
    common: _common25.default
  },
  'fy': {
    app: _app26.default,
    common: _common26.default
  },
  'gl': {
    app: _app27.default,
    common: _common27.default
  },
  'ka': {
    app: _app28.default,
    common: _common28.default
  },
  'de': {
    app: _app29.default,
    common: _common29.default
  },
  'el': {
    app: _app30.default,
    common: _common30.default
  },
  'gu': {
    app: _app31.default,
    common: _common31.default
  },
  'ht': {
    app: _app32.default,
    common: _common32.default
  },
  'ha': {
    app: _app33.default,
    common: _common33.default
  },
  'haw': {
    app: _app34.default,
    common: _common34.default
  },
  'he': {
    app: _app35.default,
    common: _common35.default
  },
  'hi': {
    app: _app36.default,
    common: _common36.default
  },
  'hmn': {
    app: _app37.default,
    common: _common37.default
  },
  'hu': {
    app: _app38.default,
    common: _common38.default
  },
  'is': {
    app: _app39.default,
    common: _common39.default
  },
  'ig': {
    app: _app40.default,
    common: _common40.default
  },
  'id': {
    app: _app41.default,
    common: _common41.default
  },
  'ga': {
    app: _app42.default,
    common: _common42.default
  },
  'it': {
    app: _app43.default,
    common: _common43.default
  },
  'ja': {
    app: _app44.default,
    common: _common44.default
  },
  'jv': {
    app: _app45.default,
    common: _common45.default
  },
  'kn': {
    app: _app46.default,
    common: _common46.default
  },
  'kk': {
    app: _app47.default,
    common: _common47.default
  },
  'km': {
    app: _app48.default,
    common: _common48.default
  },
  'ko': {
    app: _app49.default,
    common: _common49.default
  },
  'ku': {
    app: _app50.default,
    common: _common50.default
  },
  'ky': {
    app: _app51.default,
    common: _common51.default
  },
  'lo': {
    app: _app52.default,
    common: _common52.default
  },
  'la': {
    app: _app53.default,
    common: _common53.default
  },
  'lv': {
    app: _app54.default,
    common: _common54.default
  },
  'lt': {
    app: _app55.default,
    common: _common55.default
  },
  'lb': {
    app: _app56.default,
    common: _common56.default
  },
  'mk': {
    app: _app57.default,
    common: _common57.default
  },
  'mg': {
    app: _app58.default,
    common: _common58.default
  },
  'ms': {
    app: _app59.default,
    common: _common59.default
  },
  'ml': {
    app: _app60.default,
    common: _common60.default
  },
  'mt': {
    app: _app61.default,
    common: _common61.default
  },
  'mi': {
    app: _app62.default,
    common: _common62.default
  },
  'mr': {
    app: _app63.default,
    common: _common63.default
  },
  'mn': {
    app: _app64.default,
    common: _common64.default
  },
  'my': {
    app: _app65.default,
    common: _common65.default
  },
  'ne': {
    app: _app66.default,
    common: _common66.default
  },
  'nb': {
    app: _app67.default,
    common: _common67.default
  },
  'ny': {
    app: _app68.default,
    common: _common68.default
  },
  'ps': {
    app: _app69.default,
    common: _common69.default
  },
  'fa': {
    app: _app70.default,
    common: _common70.default
  },
  'pl': {
    app: _app71.default,
    common: _common71.default
  },
  'pt': {
    app: _app72.default,
    common: _common72.default
  },
  'pa': {
    app: _app73.default,
    common: _common73.default
  },
  'ro': {
    app: _app74.default,
    common: _common74.default
  },
  'ru': {
    app: _app75.default,
    common: _common75.default
  },
  'sm': {
    app: _app76.default,
    common: _common76.default
  },
  'gd': {
    app: _app77.default,
    common: _common77.default
  },
  'sr': {
    app: _app78.default,
    common: _common78.default
  },
  'st': {
    app: _app79.default,
    common: _common79.default
  },
  'sn': {
    app: _app80.default,
    common: _common80.default
  },
  'sd': {
    app: _app81.default,
    common: _common81.default
  },
  'si': {
    app: _app82.default,
    common: _common82.default
  },
  'sk': {
    app: _app83.default,
    common: _common83.default
  },
  'sl': {
    app: _app84.default,
    common: _common84.default
  },
  'so': {
    app: _app85.default,
    common: _common85.default
  },
  'es': {
    app: _app86.default,
    common: _common86.default
  },
  'su': {
    app: _app87.default,
    common: _common87.default
  },
  'sw': {
    app: _app88.default,
    common: _common88.default
  },
  'sv': {
    app: _app89.default,
    common: _common89.default
  },
  'fil': {
    app: _app90.default,
    common: _common90.default
  },
  'tg': {
    app: _app91.default,
    common: _common91.default
  },
  'ta': {
    app: _app92.default,
    common: _common92.default
  },
  'te': {
    app: _app93.default,
    common: _common93.default
  },
  'th': {
    app: _app94.default,
    common: _common94.default
  },
  'tr': {
    app: _app95.default,
    common: _common95.default
  },
  'uk': {
    app: _app96.default,
    common: _common96.default
  },
  'ur': {
    app: _app97.default,
    common: _common97.default
  },
  'uz': {
    app: _app98.default,
    common: _common98.default
  },
  'vi': {
    app: _app99.default,
    common: _common99.default
  },
  'cy': {
    app: _app100.default,
    common: _common100.default
  },
  'xh': {
    app: _app101.default,
    common: _common101.default
  },
  'yi': {
    app: _app102.default,
    common: _common102.default
  },
  'yo': {
    app: _app103.default,
    common: _common103.default
  },
  'zu': {
    app: _app104.default,
    common: _common104.default
  }
};
exports.default = _default;