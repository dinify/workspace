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
  handleChange = () => {}
}) => {
  return (
    <Grid container wrap="nowrap" justify="flex-start" alignItems="center">
      {options.map((option, i) => (
        <Grid item key={i}>
          <Day selected={i === selected} onClick={() => handleChange(i)}>
            {option}
          </Day>
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ValuePicker);
