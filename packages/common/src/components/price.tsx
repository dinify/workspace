import React from "react";
import { useSelector } from "react-redux";

// TODO: fetch from https://static.dinify.app/misc/currencyRates
import { useFormatters } from "../lib/i18n/formatter";
import { useConverter } from "../lib/i18n/converter";
import { CurrencyType } from "@phensley/cldr";
import { Price } from "@dinify/types";

interface PriceProps {
  display?: CurrencyType;
  price: Price;
  original?: boolean;
}

/**
 * Formats and converts the price to the display currency,
 * using the profile currency type as fallback.
 *
 * @param price The price object to format, can be in any currency type.
 * @param display The currency type to display this price in. Defaults to profile currency.
 */
export default ({ price, display, original = false, ...props }: PriceProps) => {
  if (!price) return null;

  const displayCurrency = useSelector(
    (state: any) => state.firebase.profile.displayCurrency
  );
  const currency = original
    ? price.currency
    : display || displayCurrency || price.currency;

  // coerce function builtin to the formatter
  const currencyFormatter = useFormatters().currency;

  const convertedPrice = useConverter(price, currency);
  return (
    <span style={{ textTransform: "none" }}>
      {currencyFormatter([convertedPrice], ["short"])}
    </span>
  );
};
