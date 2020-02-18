// @flow
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = theme => ({
  paddedAppbar: {
    paddingTop: theme.mixins.toolbar.offsetHeight
  },
  padded: {
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(15),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8)
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  paddedNarrow: {
    paddingTop: theme.spacing(9),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      paddingRight: theme.spacing(3)
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }
});

const ResponsiveContainer = ({
  classes,
  children,
  fixedAppBar,
  narrow,
  style
}: any) => {
  return (
    <div
      style={style}
      className={classNames(
        narrow ? classes.paddedNarrow : classes.padded,
        fixedAppBar ? classes.paddedAppbar : null
      )}
    >
      {children}
    </div>
  );
};

export default withStyles(styles)(ResponsiveContainer);
