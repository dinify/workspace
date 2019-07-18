import aliases from 'lib/aliases.json';

export function mainPathsFor(locales) {
  const mainFiles = [
    'ca-buddhist',
    'ca-chinese',
    'ca-coptic',
    'ca-dangi',
    'ca-ethiopic',
    'ca-ethiopic-amete-alem',
    'ca-generic',
    'ca-gregorian',
    'ca-hebrew',
    'ca-indian',
    'ca-islamic',
    'ca-islamic-civil',
    'ca-islamic-rgsa',
    'ca-islamic-tbla',
    'ca-islamic-umalqura',
    'ca-japanese',
    'ca-persian',
    'ca-roc',
    'characters',
    'contextTransforms',
    'currencies',
    'dateFields',
    'delimiters',
    'languages',
    'layout',
    'listPatterns',
    'localeDisplayNames',
    'measurementSystemNames',
    'numbers',
    'posix',
    'scripts',
    'territories',
    'timeZoneNames',
    'units',
    'variants'
  ];
  return locales.reduce((sum, locale) => {
    mainFiles.forEach((mainFile) => {
      sum.push(['main', locale, mainFile].join('/'));
    });
    return sum;
  }, []);
}

export function supplementalPaths() {
  const supplementalFiles = [
    'aliases',
    'calendarData',
    'calendarPreferenceData',
    'characterFallbacks',
    'codeMappings',
    'currencyData',
    'dayPeriods',
    'gender',
    'languageData',
    'languageGroups',
    'languageMatching',
    'likelySubtags',
    'measurementData',
    'metaZones',
    'numberingSystems',
    'ordinals',
    'parentLocales',
    'plurals',
    'primaryZones',
    'references',
    'territoryContainment',
    'territoryInfo',
    'timeData',
    'unitPreferenceData',
    'weekData',
    'windowsZones'
  ];

  return supplementalFiles.map((supplementalFile) => {
    return ['supplemental', supplementalFile].join('/');
  });
}

function flatten(obj) {
  const arr = [];
  const _flatten = (obj, arr) => {
    if(Array.isArray(obj)) {
      return obj.forEach((obj) => {
        _flatten(obj, arr);
      });
    }
    arr.push(obj);
  }
  _flatten(obj, arr);
  return arr;
}

export function getLanguageAlias = (language) => {
  let replacements = [];
  Object.entries(aliases).forEach(([key, value]) => {
  	if (lang === key) {
      replacements.push(value._replacement);
    }
  })
  if (replacements.length === 0) return null;
  return replacements[0];
}
