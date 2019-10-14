import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
  const { t, i18n } = useTranslation();
  if (!calories) return <div />;
  return (
    <div>
      <Typography
        className={classes.secondary}
        gutterBottom
        variant="overline">
        {t('nutrition.facts')}
      </Typography>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          {t('nutrition.fats')}
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end', textTransform: 'none'}}
          variant="overline">
          {i18n.format(calories.fats, 'unit:mass-gram,narrow')}
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          {t('nutrition.carbs')}
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end', textTransform: 'none'}}
          variant="overline">
          {i18n.format(calories.carbs, 'unit:mass-gram,narrow')}
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          {t('nutrition.proteins')}
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end', textTransform: 'none'}}
          variant="overline">
          {i18n.format(calories.proteins, 'unit:mass-gram,narrow')}
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          {t('nutrition.calories')}
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end', textTransform: 'none'}}
          variant="overline">
          {i18n.format(calories.total, 'unit:energy-foodcalorie,narrow')}
        </Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(NutritionFacts);
