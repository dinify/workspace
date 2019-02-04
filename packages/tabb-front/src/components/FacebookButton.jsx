// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FacebookLogo from 'icons/FacebookLogo';

const styles = theme => ({
  leftGutter: {
    marginLeft: theme.spacing.unit * 2,
  },
  facebookButton: {
    height: 40,
    justifyContent: 'start',
    color: 'rgba(255, 255, 255, 0.87)',
    backgroundColor: '#3b5998',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#546ca5', // #3b5998 + 0.12 white
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

const FacebookButton = ({
  classes,
  ...props
}) => {
  return (
    <Button
      fullWidth
      className={classes.facebookButton}
      classes={{ label: classes.uncapitalized }}
      variant="contained"
      {...props}>
      <FacebookLogo />
      <span className={classes.leftGutter}>Continue with Facebook</span>
    </Button>
  );
}

export default withStyles(styles)(FacebookButton);
