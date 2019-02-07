// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  paddedAppbar: {
    paddingTop: theme.mixins.toolbar.offsetHeight,
  },
  padded: {
    paddingLeft: theme.spacing.unit * 15,
    paddingRight: theme.spacing.unit * 15,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 8,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  paddedNarrow: {
    paddingTop: theme.spacing.unit * 9,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing.unit * 3,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
});

const ResponsiveContainer = ({ classes, children, fixedAppBar, narrow, style }) => {
  return (
    <div
      style={style}
      className={classNames(
        narrow ? classes.paddedNarrow : classes.padded,
        fixedAppBar ? classes.paddedAppbar : null,
      )}
    >
      {children}
    </div>
  );
};

export default withStyles(styles)(ResponsiveContainer);
