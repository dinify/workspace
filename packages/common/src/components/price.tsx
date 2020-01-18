import React from "react";
import { useSelector } from "react-redux";

// TODO: fetch from https://static.dinify.app/misc/currencyRates
import { useFormatters } from "../lib/i18n/formatter";
import { useConverter } from "../lib/i18n/converter";
import { CurrencyType } from "@phensley/cldr";
import { Price as PriceType } from "@dinify/types";
import { useIntl } from "../lib/i18n";

interface PriceProps {
  display?: CurrencyType;
  price: PriceType;
  original?: boolean;
  style?: any;
}

/**
 * Formats and converts the price to the display currency,
 * using the profile currency type as fallback.
 *
 * @param price The price object to format, can be in any currency type.
 * @param display The currency type to display this price in. Defaults to profile currency.
 */
const Price: React.FC<PriceProps> = ({
  price,
  display,
  original = false,
  style,
  ...props
}) => {
  if (!price) return null;
  const cldr = useIntl(ctx => ctx.state.cldr);

  const displayCurrency = useSelector(
    (state: any) => state.firebase.profile.displayCurrency
  );
  const currency = original
    ? price.currency
    : display || displayCurrency || price.currency;

  const converted = useConverter(price, currency);
  const fractions = cldr.Numbers.getCurrencyFractions(currency);
  return (
    <span style={{ 
      textTransform: "none",
      fontFeatureSettings: '"tnum"'
    }}>
      {cldr.Numbers.formatCurrency(converted.amount, converted.currency, {
        style: "symbol",
        maximumFractionDigits: fractions.cashDigits
      })}
    </span>
  );
};

export default Price;
