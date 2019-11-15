import { CurrencyType, Decimal, MathContext } from "@phensley/cldr";
import { Price } from "@dinify/types";
import rates from "../currencyRates.json";
import { useIntl } from ".";

const defaultContext: MathContext = { precision: 28 };

// TODO: copy this to server side
export const useConverter = (price: Price, currency: CurrencyType): Price => {
  const cldr = useIntl(ctx => ctx.state.cldr);
  const fractions = cldr.Numbers.getCurrencyFractions(price.currency);

  const make = (amount: Decimal) => ({
    amount,
    currency
  });
  const amt = price.amount;
  const from = price.currency;
  const to = currency;

  if (from === to) return price;

  const context: MathContext = {
    ...defaultContext,
    precision: fractions.digits
  };
  const fromRate = new Decimal((rates.rates as any)[from]);
  const fromRateInverse = new Decimal(1 / (rates.rates as any)[from]);
  const toRate = new Decimal((rates.rates as any)[to]);
  if (from === rates.base) {
    return make(amt.multiply(fromRate, context));
  }

  const toBase = amt.multiply(fromRateInverse, context);
  return make(toBase.multiply(toRate, context));
};
