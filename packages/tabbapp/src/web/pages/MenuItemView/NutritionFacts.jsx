import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'web/components/Typography';

const styles = theme => ({
  secondary: {
    color: theme.palette.text.secondary
  }
});

const NutritionFacts = ({
  classes,
  calories
}) => {
  if (!calories) return <div />;
  return (
    <div>
      <Typography
        className={classes.secondary}
        gutterBottom
        variant="overline">
        Nutrition Facts
      </Typography>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          Fats
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end', textTransform: 'none'}}
          variant="overline">
          {calories.fats} g
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          Carbs
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end', textTransform: 'none'}}
          variant="overline">
          {calories.carbs} g
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          Proteins
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end', textTransform: 'none'}}
          variant="overline">
          {calories.proteins} g
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} >
          Calories
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
