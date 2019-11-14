import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from '@dinify/common/src/lib/i18n';

// TODO: fetch from https://static.dinify.app/misc/currencyRates
import rates from '@dinify/common/src/lib/currencyRates.json';
import { getFormatters } from '@dinify/common/src/lib/i18n/formatter';

const Price = ({ display, price, profile, original = false, ...props }) => {
  if (!price) return null;

  // eslint-disable-next-line no-unused-vars
  const { t, cldr } = useTranslation();
  const currencyFormatter = getFormatters(cldr).currency;

  // TODO: move this to server side with precision and rounding based on currency
  const convert = (amt, from, to) => {
    if (from === to) return amt;
    if (from === rates.base) return amt * rates.rates[to];
    const toBase = amt * (1 / rates.rates[from]);
    return toBase * rates.rates[to];
  };

  const currency = original
    ? price.currency
    : profile.displayCurrency || display || price.currency;
  const amount = convert(parseFloat(price.amount), price.currency, currency);
  return (
    <span style={{ textTransform: 'none' }}>
      {currencyFormatter([{ amount, currency }], ['short'])}
    </span>
  );
};

const enhance = compose(
  connect(state => ({
    profile: state.firebase.profile,
  })),
);

export default enhance(Price);
