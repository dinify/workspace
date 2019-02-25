import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Typography from '@dinify/common/dist/components/Typography';

const styles = theme => ({
  secondary: {
    color: theme.palette.text.secondary
  }
});

const NutritionFacts = ({
  classes,
  calories
}) => {
  const { t } = useTranslation();
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
          {calories.fats} g
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          {t('nutrition.carbs')}
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end', textTransform: 'none'}}
          variant="overline">
          {calories.carbs} g
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          {t('nutrition.proteins')}
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end', textTransform: 'none'}}
          variant="overline">
          {calories.proteins} g
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          {t('nutrition.calories')}
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end', textTransform: 'none'}}
          variant="overline">
          {calories.total} Kcal
        </Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(NutritionFacts);
