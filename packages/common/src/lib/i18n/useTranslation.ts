import { CLDR } from "@phensley/cldr";
import * as icepick from 'icepick';
import * as util from '../util';
import { usei18n } from ".";

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

type TFunction = (path: string[]|string, data?: any) => string;
interface TArgs {
  path: string[]|string, 
  data: { [key: string]: any }, 
  cldr: CLDR,
  translations: any
};

export let currentT: TFunction;

// useTranslation hook
export default () => {
  const { translations, cldr } = usei18n().state;
  const _t: TFunction = (path, data) => t({ path, data, cldr, translations });
  currentT = _t;
  return { t: _t, cldr };
}

export const t = ({ path, data = {}, cldr, translations }: TArgs) => {
  const p: string[] = util.path(path);
  let template = icepick.getIn(translations, p) || path;
  data.cldr = cldr;
  data._i = (key: string, format: string) => {
    const pi = util.path(key);
    const val = icepick.getIn(data, pi);
    return (cldr && format) ? i18nextFormatter(val, format, cldr) : val;
  };
  
  if (template.includes('{{')) {
    template = i18next2es6(template);
  }

  return util.substitute(template, data);
};