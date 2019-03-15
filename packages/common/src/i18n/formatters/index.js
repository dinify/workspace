
export default (globalized) => (value, type, params) => {
  // TODO: warning, globalized instance might still be undefined (async!)
  if (!globalized) return '';

  if (type === 'date') {
    return globalized.dateFormatter({date: params[0] || 'short'})(value);
  }
  if (type === 'time') {
    return globalized.dateFormatter({time: params[0] || 'short'})(value);
  }
  if (type === 'dateTime') {
    return globalized.dateFormatter({datetime: params[0] || 'short'})(value);
  }
  if (type === 'dateTimeSkeleton') {
    return globalized.dateFormatter({skeleton: params[0]})(value);
  }
  if (type === 'weekDayName') {
    const standAloneDays = globalized.cldr.main("dates/calendars/gregorian/days")['stand-alone'];
    return standAloneDays[params[0] || 'wide'][value];
  }
  if (type === 'currency') {
    return globalized.currencyFormatter(params[0])(value);
  }
  if (type === 'currencyName') {
    if (params[0]) {
      const count = parseFloat(params[0]);
      const plural = globalized.pluralGenerator()(count);
      const result = globalized.cldr.main(`numbers/currencies/${value}/displayName-count-${plural}`);
      if (result) return result;
    }
    return globalized.cldr.main(`numbers/currencies/${value}/displayName`);
  }
  if (type === 'languageName') {
    const displayName = globalized.cldr.main(`localeDisplayNames/languages/${value}`);
    return displayName;
  }
  if (type === 'territoryName') {
    const displayName = globalized.cldr.main(`localeDisplayNames/territories/${value}`);
    return displayName;
  }
  if (type === 'unit') {
    return globalized.unitFormatter(params[0], { form: params[1] || 'long' } )(value);
  }
  if (type === 'dateTimeInterval') {
    const hHKk = globalized.cldr.supplemental.timeData.preferred();
    const skeleton = hHKk + 'm';
    let greatestDiff = 'm';
    if (['h', 'K'].includes(hHKk)) {
      const isAMStart = value.start.getHours() < 12; // 0 - 23
      const isAMEnd = value.end.getHours() < 12; // 0 - 23
      if (isAMStart !== isAMEnd) greatestDiff = 'a';
    }
    const intervalFormat = globalized.cldr.main(`dates/calendars/gregorian/dateTimeFormats/intervalFormats/${skeleton}/${greatestDiff}`);
    if (intervalFormat) {
      let parts;
      let splitChar;

      const possibleSplitChars = ['–', '-', '\'a\'', 'تا', '～', '~', '至'];
      possibleSplitChars.forEach(char => {
        if (intervalFormat.includes(char)) {
          splitChar = char;
          parts = intervalFormat.split(char);
        }
      });
      const start = globalized.dateFormatter({raw: parts[0]})(value.start);
      const end = globalized.dateFormatter({raw: parts[1]})(value.end);
      return [start, end].join(splitChar);
    }

    // Use fallback in case format wasn't found
    const start = globalized.dateFormatter({time: 'short'})(value.start);
    const end = globalized.dateFormatter({time: 'short'})(value.end);
    const intervalFormatFallback = globalized.cldr.main(`dates/calendars/gregorian/dateTimeFormats/intervalFormats/intervalFormatFallback`);
    return intervalFormatFallback.replace('{0}', start).replace('{1}', end);
  }
  if (type === 'list') {
    const list = value;
    if (!list || list.length === 0) return '';
    else if (list.length === 1) return value[0];
    else {
      const listType = params[0] || 'standard'; // one of: standard, or, unit
      const widthType = params[1] || ''; // one of: narrow, short, (empty)

      const listPatternRulePath = `listPatterns/listPattern-type-${listType}`;
      const listPatternRules = globalized.cldr.main(widthType === '' ? listPatternRulePath : `${listPatternRulePath}-${widthType}`);
      if (!listPatternRules)
        throw new Error('Unable to find a valid list pattern or fallback pattern for key: ' + (widthType === '' ? listPatternRulePath : `${listPatternRulePath}-${widthType}`));

      // Check for literal length rules
      if (listPatternRules.hasOwnProperty(list.length + '')) {
        let result = listPatternRules[list.length + ''];

        // This means we have a special handling for just this number of elements
        list.forEach((listItem, idx) => {
          result = result.replace('{' + idx + '}', listItem);
        });
        return result;
      }

      // If we're here, we've got a standard "start" "middle" "end" situation
      let result = '';

      // Start with end
      var pointer = list.length - 1;
      result = listPatternRules.end
        .replace('{1}', list[pointer])
        .replace('{0}', list[pointer - 1]);

      // We used up 2 indexes already
      pointer = pointer - 2;

      // Fill in the middle section
      while (pointer > 0) {
        result = listPatternRules.middle
          .replace('{1}', result)
          .replace('{0}', list[pointer]);
        pointer -= 1;
      }

      // Handle the 'start' base-case
      result = listPatternRules.start
        .replace('{1}', result)
        .replace('{0}', list[pointer]);

      return result;
    }
  }
  return null;
}
