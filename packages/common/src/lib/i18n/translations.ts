import { CLDR } from "@phensley/cldr";
import * as icepick from "icepick";
import * as util from "../util";
import { useIntl } from ".";
import path from "ramda/es/path";

// parse i18next template language to ES6 template
const i18next2es6 = (template: string) => {
  return template
    .split("{{")
    .map((part: string) =>
      part
        .split("}}")
        .map((parti: string) =>
          template.substring(
            template.indexOf(parti) - 2,
            template.indexOf(parti)
          ) === "{{"
            ? `_i('${parti
                .split(",")
                .map(p => p.trim())
                .join("', '")}')`
            : parti
        )
        .join("}")
    )
    .join("${");
};

const i18nextFormatter = (value: any, format: string, cldr: CLDR): any => {
  switch (format) {
    case "time:short":
      return cldr.Calendars.formatDate(value, { time: "short" });
    case "number":
      return cldr.Numbers.formatDecimal(value, { style: "short" });
    case "list":
      return cldr.General.formatList(value, "and");
    default:
      console.warn("Unrecognized format: ", format);
      break;
  }
  return value;
};

// example template
// "Testing interpolation ${cldr.Calendars.formatDate(time, { time: 'short' })}";

export type TFunction = (path: string[] | string, data?: any) => string;
interface TArgs {
  data: { [key: string]: any };
  cldr: CLDR;
  template: string;
}

// useTranslation hook
export default () => {
  const { messages, cldr, schema } = useIntl().state;
  const getTemplate = (path: any): string => {
    if (!messages || !schema) return path;
    return messages[schema.indexOf(path)];
  };
  const _t: TFunction = (path, data) =>
    t({ data, cldr, template: getTemplate(path) });
  return { t: _t, cldr };
};

export const t = ({ template, data = {}, cldr }: TArgs) => {
  data.cldr = cldr;
  data._i = (key: string, format: string) => {
    const pi = util.path(key);
    const val = icepick.getIn(data, pi);
    return cldr && format ? i18nextFormatter(val, format, cldr) : val;
  };

  if (template.includes("{{")) {
    template = i18next2es6(template);
  }

  return util.substitute(template, data);
};

// const render = (template: string, data: any): React.ReactNode|string => {
//   const { _i, cldr, ...rest } = data;
//   const hasElement = toPairs(rest).map(([,v]: any) => React.isValidElement(v)).reduce((p:any,c:any) => p || c, false);
//   if (!hasElement) return util.substitute(template, data);
//   else {
//     // split into chunks
//     const temp = util.substitute(template, {});

//     // render to component tree
//     return temp;
//   }
// }
