import { useIntl, IntlContextType } from ".";
import { format } from "./formatter";
import schemas from "./schemas";
import { MessageArg, MessageNamedArgs } from "@phensley/cldr";

export type TFunction = (
  path: string[] | string,
  positional?: MessageArg[],
  named?: MessageNamedArgs
) => string;

const notFound: string[] = [];
const errorNotFound = (msg: string, path: string) => {
  if (!notFound.includes(path)) {
    notFound.push(path);
    console.error(msg, path);
  }
};

export let currentT = (...args: any[]) => "";

// useTranslation hook
export default () => {
  const context = useIntl<IntlContextType>();
  const {
    config,
    state: { locale, messages, cldr }
  } = context;
  const getTemplate = (path: any): string => {
    if (
      !messages ||
      !schemas[config.namespace] ||
      !schemas[config.namespace].schema
    )
      return "\u00a0";
    const { schema } = schemas[config.namespace];
    if (schema.indexOf(path) === -1)
      errorNotFound(`Path not found in ${messages.length} messages:`, path);
    return messages[schema.indexOf(path)] || "\u00a0";
  };
  const t: TFunction = (path, positional, named) => {
    const template = getTemplate(path);
    return format(locale, cldr, template, positional, named);
  };
  currentT = t;
  return { t, cldr };
};
