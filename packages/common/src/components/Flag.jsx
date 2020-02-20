// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import flags from '../icons/flags';
import Public from '@material-ui/icons/PublicRounded';

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
  ...props
}) => {
  const flag = flags[country];
  if (!flag) return <Public style={{ opacity: 0.54 }} {...props} />;
  return (
    <img alt={country} className={classes.root} src={flag} {...props} />
  );
};

export default withStyles(styles)(Flag);
