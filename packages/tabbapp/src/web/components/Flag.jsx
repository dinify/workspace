import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import flags from 'lib/flags.json';
import flagIcons from 'icons/flags';

const styles = theme => ({
  root: {
    width: 25.2,
    height: 18,
    borderRadius: 3,
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`,
  },
  rootAlt: {
    width: 24,
    height: 18,
  }
})

const Flag = ({
  classes,
  country = 'us',
}) => {
  return (
    <img alt={country} className={classes.root} src={flagIcons[country]} />
  );
};

export default withStyles(styles)(Flag);
