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

const coerce = (arg: any) => {
  try {
    return new Decimal(arg);
  } catch (e) {
    return DecimalConstants.NAN;
  }
};

const getFormatters = (cldr: CLDR) => ({
  date: (args: MessageArg[], options: string[]) => {
    const width = options[0] as FormatWidthType;
    return cldr.Calendars.formatDate(args[0] as ZonedDateTime, { date: width });
  },
  time: (args: MessageArg[], options: string[]) => {
    const width = options[0] as FormatWidthType;
    return cldr.Calendars.formatDate(args[0] as ZonedDateTime, { time: width });
  },
  datetime: (args: MessageArg[], options: string[]) => {
    const width = options[0] as FormatWidthType;
    return cldr.Calendars.formatDate(args[0] as ZonedDateTime, {
      datetime: width
    });
  },
  currency: (args: MessageArg[], options: string[]) => {
    const arg = args[0] as Price;
    const style = options[0] as CurrencyFormatStyleType;
    return cldr.Numbers.formatCurrency(coerce(arg.amount), arg.currency, {
      style
    });
  },
  number: (args: MessageArg[], options: string[]) => {
    const style = options[0] as DecimalFormatStyleType;
    return cldr.Numbers.formatDecimal(coerce(args[0]), {
      style: style || "short"
    });
  },
  decimal: (args: MessageArg[], options: string[]) => {
    const style = options[0] as DecimalFormatStyleType;
    return cldr.Numbers.formatDecimal(coerce(args[0]), { style });
  },
  list: (args: MessageArg[], options: string[]) => {
    const type = options[0] as ListPatternType;
    return cldr.General.formatList(args[0], type);
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
