import {
  buildMessageMatcher,
  parseMessagePattern,
  MessageArg,
  MessageEngine,
  MessageNamedArgs,
  Locale,
  FormatWidthType,
  CLDR,
  ZonedDateTime,
  CurrencyFormatStyleType,
  Decimal,
  DecimalConstants,
  DecimalFormatStyleType,
  ListPatternType
} from "@phensley/cldr";
import { Price } from "@dinify/types";
import { useIntl } from ".";

const coerce = (arg: any) => {
  try {
    return new Decimal(arg);
  } catch (e) {
    return DecimalConstants.NAN;
  }
};

export const useFormatters = () => {
  const cldr = useIntl(ctx => ctx.state.cldr);
  return getFormatters(cldr);
};

interface Options<T> {
  [0]: T;
}

type Formatter<T> = (args: MessageArg[], options: Options<T>) => string;

interface Formatters {
  date: Formatter<FormatWidthType>;
  time: Formatter<FormatWidthType>;
  datetime: Formatter<FormatWidthType>;
  currency: Formatter<CurrencyFormatStyleType>;
  number: Formatter<DecimalFormatStyleType>;
  decimal: Formatter<DecimalFormatStyleType>;
  list: Formatter<ListPatternType>;
}

export const getFormatters = (cldr: CLDR): Formatters => ({
  date: (args, options) => {
    return cldr.Calendars.formatDate(args[0] as ZonedDateTime, {
      date: options[0]
    });
  },
  time: (args, options) => {
    return cldr.Calendars.formatDate(args[0] as ZonedDateTime, {
      time: options[0]
    });
  },
  datetime: (args, options) => {
    return cldr.Calendars.formatDate(args[0] as ZonedDateTime, {
      datetime: options[0]
    });
  },
  currency: (args, options) => {
    const price = args[0] as Price;
    return cldr.Numbers.formatCurrency(coerce(price.amount), price.currency, {
      style: options[0]
    });
  },
  number: (args, options) => {
    return cldr.Numbers.formatDecimal(coerce(args[0]), {
      style: options[0] || "short"
    });
  },
  decimal: (args, options) => {
    return cldr.Numbers.formatDecimal(coerce(args[0]), { style: options[0] });
  },
  list: (args, options) => {
    return cldr.General.formatList(args[0], options[0]);
  }
});

const messageMatcher = buildMessageMatcher([
  "date",
  "time",
  "datetime",
  "currency",
  "number",
  "decimal",
  "list"
]);

const parse = (message: string) => parseMessagePattern(message, messageMatcher);

export const format = (
  locale: Locale,
  cldr: CLDR,
  message: string,
  positional: MessageArg[],
  named: MessageNamedArgs = {}
) => {
  const engine = new MessageEngine(
    locale.tag.language(),
    getFormatters(cldr),
    parse(message)
  );
  return engine.evaluate(positional, named);
};
