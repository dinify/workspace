import { useIntl } from ".";
import { format } from "./formatter";
import values from "ramda/es/values";
import schemas from "./schemas";

export type TFunction = (path: string[] | string, data?: any) => string;

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
  const context = useIntl();
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
  const t: TFunction = (path, data) => {
    const template = getTemplate(path);
    return format(locale, cldr, template, [...values(data)], data);
  };
  currentT = t;
  return { t, cldr };
};
