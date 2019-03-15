"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(globalized) {
  return function (value, type, params) {
    // TODO: warning, globalized instance might still be undefined (async!)
    if (!globalized) return '';

    if (type === 'date') {
      return globalized.dateFormatter({
        date: params[0] || 'short'
      })(value);
    }

    if (type === 'time') {
      return globalized.dateFormatter({
        time: params[0] || 'short'
      })(value);
    }

    if (type === 'dateTime') {
      return globalized.dateFormatter({
        datetime: params[0] || 'short'
      })(value);
    }

    if (type === 'dateTimeSkeleton') {
      return globalized.dateFormatter({
        skeleton: params[0]
      })(value);
    }

    if (type === 'weekDayName') {
      var standAloneDays = globalized.cldr.main("dates/calendars/gregorian/days")['stand-alone'];
      return standAloneDays[params[0] || 'wide'][value];
    }

    if (type === 'currency') {
      return globalized.currencyFormatter(params[0])(value);
    }

    if (type === 'currencyName') {
      if (params[0]) {
        var count = parseFloat(params[0]);
        var plural = globalized.pluralGenerator()(count);
        var result = globalized.cldr.main("numbers/currencies/".concat(value, "/displayName-count-").concat(plural));
        if (result) return result;
      }

      return globalized.cldr.main("numbers/currencies/".concat(value, "/displayName"));
    }

    if (type === 'languageName') {
      var displayName = globalized.cldr.main("localeDisplayNames/languages/".concat(value));
      return displayName;
    }

    if (type === 'territoryName') {
      var _displayName = globalized.cldr.main("localeDisplayNames/territories/".concat(value));

      return _displayName;
    }

    if (type === 'unit') {
      return globalized.unitFormatter(params[0], {
        form: params[1] || 'long'
      })(value);
    }

    if (type === 'dateTimeInterval') {
      var hHKk = globalized.cldr.supplemental.timeData.preferred();
      var skeleton = hHKk + 'm';
      var greatestDiff = 'm';

      if (['h', 'K'].includes(hHKk)) {
        var isAMStart = value.start.getHours() < 12; // 0 - 23

        var isAMEnd = value.end.getHours() < 12; // 0 - 23

        if (isAMStart !== isAMEnd) greatestDiff = 'a';
      }

      var intervalFormat = globalized.cldr.main("dates/calendars/gregorian/dateTimeFormats/intervalFormats/".concat(skeleton, "/").concat(greatestDiff));

      if (intervalFormat) {
        var parts;
        var splitChar;
        var possibleSplitChars = ['–', '-', '\'a\'', 'تا', '～', '~', '至'];
        possibleSplitChars.forEach(function (char) {
          if (intervalFormat.includes(char)) {
            splitChar = char;
            parts = intervalFormat.split(char);
          }
        });

        var _start = globalized.dateFormatter({
          raw: parts[0]
        })(value.start);

        var _end = globalized.dateFormatter({
          raw: parts[1]
        })(value.end);

        return [_start, _end].join(splitChar);
      } // Use fallback in case format wasn't found


      var start = globalized.dateFormatter({
        time: 'short'
      })(value.start);
      var end = globalized.dateFormatter({
        time: 'short'
      })(value.end);
      var intervalFormatFallback = globalized.cldr.main("dates/calendars/gregorian/dateTimeFormats/intervalFormats/intervalFormatFallback");
      return intervalFormatFallback.replace('{0}', start).replace('{1}', end);
    }

    if (type === 'list') {
      var list = value;
      if (!list || list.length === 0) return '';else if (list.length === 1) return value[0];else {
        var listType = params[0] || 'standard'; // one of: standard, or, unit

        var widthType = params[1] || ''; // one of: narrow, short, (empty)

        var listPatternRulePath = "listPatterns/listPattern-type-".concat(listType);
        var listPatternRules = globalized.cldr.main(widthType === '' ? listPatternRulePath : "".concat(listPatternRulePath, "-").concat(widthType));
        if (!listPatternRules) throw new Error('Unable to find a valid list pattern or fallback pattern for key: ' + (widthType === '' ? listPatternRulePath : "".concat(listPatternRulePath, "-").concat(widthType))); // Check for literal length rules

        if (listPatternRules.hasOwnProperty(list.length + '')) {
          var _result2 = listPatternRules[list.length + '']; // This means we have a special handling for just this number of elements

          list.forEach(function (listItem, idx) {
            _result2 = _result2.replace('{' + idx + '}', listItem);
          });
          return _result2;
        } // If we're here, we've got a standard "start" "middle" "end" situation


        var _result = ''; // Start with end

        var pointer = list.length - 1;
        _result = listPatternRules.end.replace('{1}', list[pointer]).replace('{0}', list[pointer - 1]); // We used up 2 indexes already

        pointer = pointer - 2; // Fill in the middle section

        while (pointer > 0) {
          _result = listPatternRules.middle.replace('{1}', _result).replace('{0}', list[pointer]);
          pointer -= 1;
        } // Handle the 'start' base-case


        _result = listPatternRules.start.replace('{1}', _result).replace('{0}', list[pointer]);
        return _result;
      }
    }

    return null;
  };
};

exports.default = _default;