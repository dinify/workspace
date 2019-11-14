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

// useTranslation hook
export default () => {
  const context = useIntl();
  const {
    config,
    state: { locale, messages, cldr }
  } = context;
  const { schema } = schemas[config.namespace];
  const getTemplate = (path: any): string => {
    if (!messages || !schema) return "\u00a0";
    if (schema.indexOf(path) === -1)
      errorNotFound(`Path not found in ${messages.length} messages:`, path);
    return messages[schema.indexOf(path)] || "\u00a0";
  };
  const t: TFunction = (path, data) => {
    const template = getTemplate(path);
    return format(locale, cldr, template, [...values(data)], data);
  };
  return { t, cldr };
};
