import { CurrencyType, Decimal, MathContext } from "@phensley/cldr";
import { Price } from "@dinify/types";
import rates from "../currencyRates.json";
import { useIntl } from ".";
import { coerce } from "./formatter";

const defaultContext: MathContext = { precision: 28 };

// TODO: copy this to server side
export const useConverter = (price: Price, currency: CurrencyType) => {
  const cldr = useIntl(ctx => ctx.state.cldr);
  const fractions = cldr.Numbers.getCurrencyFractions(currency);

  const make = (amount: Decimal) => ({
    amount,
    currency
  });
  const amt = coerce(price.amount);
  const from = price.currency;
  const to = currency;

  const context: MathContext = {
    ...defaultContext,
    scale: fractions.digits
  };
  const fromRate = (rates.rates as any)[from];
  const toRate = (rates.rates as any)[to];
  const rateInverse = (1 / fromRate) * toRate;

  return from === to ? price : make(amt.multiply(coerce(rateInverse), context));
};
