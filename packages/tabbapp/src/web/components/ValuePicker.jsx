import React from 'react';
import Grid from '@material-ui/core/Grid';
import Day from 'material-ui-pickers/DatePicker/Day';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
})

const ValuePicker = ({
  classes,
  selected,
  options,
}) => {
  return (
    <Grid container wrap="nowrap" justify="flex-start" alignItems="center">
      {options.map((option, i) => (
        <Grid item>
          <Day selected={i === selected}>
            {option}
          </Day>
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ValuePicker);
