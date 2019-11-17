import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Price from '@dinify/common/src/components/price';
import Typography from '@material-ui/core/Typography';

const TotalPrice = ({ profile, price, ...props }) => {
  const { t, cldr } = useTranslation();
  let localized = false;
  if (
    profile &&
    price &&
    profile.displayCurrency &&
    profile.displayCurrency !== price.currency
  ) {
    localized = cldr.Numbers.getCurrencyDisplayName(profile.displayCurrency, {
      context: 'standalone',
    });
    localized = `(${localized})`;
  }

  return (
    <React.Fragment>
      {localized && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography style={{ flex: 1 }} variant="caption">
            {t('totalConverted', [localized])}
          </Typography>
          <Typography variant="overline">
            <Price price={price} />
          </Typography>
        </div>
      )}
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
        <Typography style={{ flex: 1 }} variant="button">
          {t('total')}
        </Typography>
        <Typography variant="subtitle1">
          <Price original price={price} />
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default connect(state => ({
  profile: state.firebase.profile,
}))(TotalPrice);
