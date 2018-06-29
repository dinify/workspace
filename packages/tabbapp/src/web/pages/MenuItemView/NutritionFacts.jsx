import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from 'web/components/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  secondary: {
    color: theme.palette.text.secondary
  },
});

const NutritionFacts = ({
  classes,
  calories
}) => {
  if (!calories) return <div />;
  return (
    <Grid item xs={6}>
      <Typography
        className={classes.secondary}
        gutterBottom
        variant="overline">
        Nutrition Facts
      </Typography>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} variant="body1">
          Fats
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end'}}
          variant="overline">
          {calories.fats} g
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} variant="body1">
          Carbs
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end'}}
          variant="overline">
          {calories.carbs} g
        </Typography>
      </div>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} variant="body1">
          Proteins
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end'}}
          variant="overline">
          {calories.proteins} g
        </Typography>
      </div>
      <Divider style={{marginTop: 8, marginBottom: 8}}/>
      <div style={{display: 'flex'}}>
        <Typography style={{flex: 1}} variant="body2">
          Total
        </Typography>
        <Typography
          style={{alignSelf: 'flex-end'}}
          variant="overline">
          {calories.total} kJ
        </Typography>
      </div>
    </Grid>
  )
}

export default withStyles(styles)(NutritionFacts);
