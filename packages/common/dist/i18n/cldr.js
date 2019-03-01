"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mainPathsFor = mainPathsFor;
exports.supplementalPaths = supplementalPaths;

function mainPathsFor(locales) {
  var mainFiles = ['ca-buddhist', 'ca-chinese', 'ca-coptic', 'ca-dangi', 'ca-ethiopic', 'ca-ethiopic-amete-alem', 'ca-generic', 'ca-gregorian', 'ca-hebrew', 'ca-indian', 'ca-islamic', 'ca-islamic-civil', 'ca-islamic-rgsa', 'ca-islamic-tbla', 'ca-islamic-umalqura', 'ca-japanese', 'ca-persian', 'ca-roc', 'characters', 'contextTransforms', 'currencies', 'dateFields', 'delimiters', 'languages', 'layout', 'listPatterns', 'localeDisplayNames', 'measurementSystemNames', 'numbers', 'posix', 'scripts', 'territories', 'timeZoneNames', 'units', 'variants'];
  return locales.reduce(function (sum, locale) {
    mainFiles.forEach(function (mainFile) {
      sum.push(['main', locale, mainFile].join('/'));
    });
    return sum;
  }, []);
}

function supplementalPaths() {
  var supplementalFiles = ['aliases', 'calendarData', 'calendarPreferenceData', 'characterFallbacks', 'codeMappings', 'currencyData', 'dayPeriods', 'gender', 'languageData', 'languageGroups', 'languageMatching', 'likelySubtags', 'measurementData', 'metaZones', 'numberingSystems', 'ordinals', 'parentLocales', 'plurals', 'primaryZones', 'references', 'territoryContainment', 'territoryInfo', 'timeData', 'unitPreferenceData', 'weekData', 'windowsZones'];
  return supplementalFiles.map(function (supplementalFile) {
    return ['supplemental', supplementalFile].join('/');
  });
}

function flatten(obj) {
  var arr = [];

  var _flatten = function _flatten(obj, arr) {
    if (Array.isArray(obj)) {
      return obj.forEach(function (obj) {
        _flatten(obj, arr);
      });
    }

    arr.push(obj);
  };

  _flatten(obj, arr);

  return arr;
}