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
}) => {
  const flag = flags[country];
  if (!flag) return <Public style={{opacity: 0.54}}/>;
  return (
    <img alt={country} className={classes.root} src={flag} />
  );
};

export default withStyles(styles)(Flag);
