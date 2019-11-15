import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Price from '@dinify/common/src/components/price';
import Typography from '@material-ui/core/Typography';

const TotalPrice = ({
  profile,
  price,
  ...props
}) => {
  const { t, cldr } = useTranslation();
  return (
    <React.Fragment>
      {profile && price && profile.displayCurrency && profile.displayCurrency !== price.currency && (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Typography style={{flex: 1}} variant="caption">
            {t('totalConverted', {currencyName: cldr.Numbers.getCurrencyDisplayName(profile.displayCurrency, {
              context: 'standalone'
            })})}
          </Typography>
          <Typography variant="overline">
            <Price price={price} />
          </Typography>
        </div>
      )}
      <div style={{marginTop: 8, display: 'flex', alignItems: 'center'}}>
        <Typography style={{flex: 1}} variant="button">
          {t('total')}
        </Typography>
        <Typography variant="subtitle1">
          <Price original price={price} />
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default connect(
  state => ({
    profile: state.firebase.profile
  })
)(TotalPrice);
