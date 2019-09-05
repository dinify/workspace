import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Price from 'web/components/Price';
import Typography from '@material-ui/core/Typography';

const TotalPrice = ({
  profile,
  price,
  ...props
}) => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      {profile && price && profile.displayCurrency !== price.currency && (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Typography style={{flex: 1}} variant="caption">
            {t('totalConverted', {currencyName: i18n.format(profile.displayCurrency, `currencyName:${price.amount}`)})}
          </Typography>
          <Typography variant="overline">
            <Price price={price} />
          </Typography>
        </div>
      )}
      <div style={{display: 'flex', alignItems: 'center'}}>
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
