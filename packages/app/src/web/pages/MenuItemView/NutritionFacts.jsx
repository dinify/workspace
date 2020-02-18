import React from 'react';
import { withStyles } from '@material-ui/styles';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  secondary: {
    color: theme.palette.text.secondary
  }
});

const NutritionFacts = ({
  classes,
  calories
}) => {
  const { t, cldr } = useTranslation();
  if (!calories) return <div />;
  return (
    <div>
      <Typography
        className={classes.secondary}
        gutterBottom
        variant="overline">
        {t('nutrition.facts')}
      </Typography>
      {['fats', 'carbs', 'proteins'].map(key =>
        <div style={{ display: 'flex' }}>
          <Typography style={{ flex: 1 }} >
            {t('nutrition.fats')}
          </Typography>
          <Typography
            style={{ alignSelf: 'flex-end', textTransform: 'none' }}
            variant="overline">
            {cldr.Units.formatQuantity({ value: calories.fats, unit: 'gram' }, { length: 'narrow' })}
          </Typography>
        </div>
      )}
      <div style={{ display: 'flex' }}>
        <Typography style={{ flex: 1 }} >
          {t('nutrition.calories')}
        </Typography>
        <Typography
          style={{ alignSelf: 'flex-end', textTransform: 'none' }}
          variant="overline">
          {cldr.Units.formatQuantity({ value: calories.total, unit: 'foodcalorie' }, { length: 'narrow' })}
        </Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(NutritionFacts);
