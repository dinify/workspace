import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import flags from 'icons/flags';

const styles = theme => ({
  root: {
    borderRadius: 3,
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`,
    marginLeft: 1,
  }
})

const Flag = ({
  classes,
  country = 'us',
}) => {
  return (
    <img alt={country} className={classes.root} src={flags[country]} />
  );
};

export default withStyles(styles)(Flag);
