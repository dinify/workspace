import React from 'react';
import MuiCard from '@material-ui/core/Card';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  outlined: {
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8
  }
})

const Card = ({
  classes,
  children,
  variant = 'outlined',
  ...other
}) => {

  let rootClass;
  if (variant === 'outlined') rootClass = classes.outlined;
  return (
    <MuiCard className={rootClass} {...other}>
      {children}
    </MuiCard>
  );
};

export default withStyles(styles)(Card);
