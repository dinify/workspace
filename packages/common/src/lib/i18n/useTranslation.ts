import { useEffect, useState } from "react";
import { Locale, CLDR } from "@phensley/cldr";
import wretch from 'wretch';
import * as icepick from 'icepick';
import * as util from '../util';
import useBundle from "./useBundle";
import { LRU } from "@phensley/cldr-utils";
import { useStore } from "react-redux";

const staticRoot = 'https://static.dinify.app';

// parse i18next template language to ES6 template
const i18next2es6 = (template: string) => {
  return template.split('{{').map((part: string) => 
    part.split('}}').map((parti: string) => 
      template.substring(template.indexOf(parti) - 2, template.indexOf(parti)) === '{{' ?
        `_i('${parti.split(',').map(p => p.trim()).join('\', \'')}')` :
        parti
    ).join('}')
  ).join('${');
};

const i18nextFormatter = (value: any, format: string, cldr: CLDR): any => {
  switch(format) {
    case 'time:short':
      return cldr.Calendars.formatDate(value, { time: 'short' });
    case 'number':
      return cldr.Numbers.formatDecimal(value, { style: 'short' });
    case 'list':
      return cldr.General.formatList(value, "and");
    default:
      console.warn('Unrecognized format: ', format);
      break;
  }
  return value;
};

// example template
// "Testing interpolation ${cldr.Calendars.formatDate(time, { time: 'short' })}";

// TODO better cache implementation
const cache = new LRU(8);
const memcache = {};

// useTranslation hook
export default (locale?: Locale) => {
  const state = useStore().getState();
  const cldr = useBundle(locale);
  const language = (locale ? locale : state.locale).tag.language();
  const cacheKey = `translation-${language}`;
  const cachedValue = cache.get(cacheKey);
  const [translations, setTranslations] = useState<any>({
    language,
    json: cachedValue
  });
  
  useEffect(() => {
    if (!cachedValue) {
      wretch(`${staticRoot}/i18n/translations/${language}/app`)
        .get()
        .json(json => {
          cache.set(cacheKey, json);
          setTranslations({ language, json });
        });
    }
  }, [language]);
  const t = (path: string[]|string, data: any = {}) => {
    const p: string[] = util.path(path);
    let template = icepick.getIn(translations.json, p) || path;
    data['cldr'] = cldr;
    data['_i'] = (key: string, format: string) => {
      const pi = util.path(key);
      const val = icepick.getIn(data, pi);
      return i18nextFormatter(val, format, cldr);
    };
    
    if (template.includes('{{')) {
      template = i18next2es6(template);
    }

    return util.substitute(template, data);
  };

  return { t };
}