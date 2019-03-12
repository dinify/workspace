import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

// TODO: fetch from https://static.dinify.app/misc/currencyRates
import rates from '@dinify/common/dist/lib/currencyRates.json';

const Price = ({
  display,
  price,
  profile,
  ...props
}) => {
  if (!price) return null;
  const { i18n } = useTranslation();

  // TODO: move this to server side with precision and rounding based on currency
  const convert = (amt, from, to) => {
    if (from === to) return amt;
    if (from === rates.base) return amt * rates.rates[to];
    const toBase = amt * (1 / rates.rates[from]);
    return toBase * rates.rates[to];
  };

  const displayCurrency = profile.displayCurrency || display || price.currency;
  const number = convert(parseFloat(price.amount), price.currency, displayCurrency);
  return (
    <span style={{textTransform: 'none'}}>
      {i18n.format(number, `currency:${displayCurrency}`)}
    </span>
  );
}

const enhance = compose(
  connect(
    state => ({
      profile: state.firebase.profile
    })
  )
)

export default enhance(Price);
