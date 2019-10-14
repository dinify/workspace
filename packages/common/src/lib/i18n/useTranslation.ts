import { useEffect, useState } from "react";
import { Locale, CLDR } from "@phensley/cldr";
import wretch from 'wretch';
import * as icepick from 'icepick';
import once from '../util/once';
import * as util from '../util';
import useBundle from "./useBundle";
import { English, useLocaleState, Namespace, namespace } from ".";

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

interface Params {
  locale?: Locale, 
  namespace?: Exclude<Namespace, 'common'>
}

const getPromiseCreator = (language: string, namespaces: string[]) => () => {
  return Promise.all(namespaces.map(cns => {
    return new Promise((resolve, reject) => {
      wretch(`${staticRoot}/i18n/translations/${language}/${cns}`)
        .get()
        .json(json => {
          resolve(json);
        })
        .catch(err => reject(err));
    });
  })).then(values => {
    let aggr: any = {};
    values.forEach(v => {
      aggr = {...aggr, ...v};
    });
    return aggr;
  }).catch(err => console.log(err));
};

// useTranslation hook
export default (defaults: Params = {}) => {
  const locale = useLocaleState(defaults.locale);
  const ns = defaults.namespace || namespace;
  const namespaces = ns === 'common' ? ['common'] : ['common', ns];
  const cldr = useBundle(locale);
  const language = locale.tag.language();
  const [translations, setTranslations] = useState(English);
  
  useEffect(() => {
    once(`useTranslation-${language}`, getPromiseCreator(language, namespaces))
    .then(result => {
      setTranslations(result);
    });
  }, [language]);

  const t = (path: string[]|string, data: any = {}) => {
    const p: string[] = util.path(path);
    let template = icepick.getIn(translations, p) || path;
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

  const i18n = {
    format: (a: any, b: any) => {
      if (!alreadyLogged.includes(b)) {
        alreadyLogged.push(b);
        console.log(a, b)
      }
    },
    globalize: null
  };

  return { t, i18n };
}

let alreadyLogged: any[] = [];