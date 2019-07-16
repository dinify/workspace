import React from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

// material-ui
import Typography from '@material-ui/core/Typography';
import CheckCircle from '@material-ui/icons/CheckCircleRounded';

const DineIn = ({
  restaurantsMap,
  checkedInRestaurant,
  theme,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const restaurant = restaurantsMap[checkedInRestaurant];
  return (
    <div>
      {restaurant && <div style={{
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        padding: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{flex: 1}}>
          <Typography variant="subtitle1">
            {restaurant.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {t('dinein.checkedin')}
          </Typography>
        </div>
        <CheckCircle color="action"/>
      </div>}

    </div>
  );
};

export default connect(
  (state) => ({
    restaurantsMap: state.restaurant.all,
    checkedInRestaurant: state.restaurant.checkedInRestaurant
  })
)(withTheme()(DineIn));
