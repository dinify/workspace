// @flow
import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GoogleLogo from 'icons/GoogleLogo';

const styles = theme => ({
  leftGutter: {
    marginLeft: theme.spacing.unit * 2,
  },
  googleButton: theme.palette.type === 'light' ? {
    height: 40,
    justifyContent: 'start',
  } : {
    height: 40,
    justifyContent: 'start',
    border: '1px solid transparent',
    color: 'rgba(0, 0, 0, 0.72)',
    backgroundColor: 'rgba(255, 255, 255, 0.87)',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
  uncapitalized: {
    textTransform: 'none',
  },
});

const GoogleButton = ({
  classes,
  theme,
  ...props
}) => {
  return (
    <Button
      fullWidth
      className={classes.googleButton}
      classes={{ label: classes.uncapitalized }}
      variant={theme.palette.type === 'light' ? 'outlined' : 'contained'}
      {...props}>
      <GoogleLogo />
      <span className={classes.leftGutter}>Continue with Google</span>
    </Button>
  );
}

export default withTheme()(withStyles(styles)(GoogleButton));
