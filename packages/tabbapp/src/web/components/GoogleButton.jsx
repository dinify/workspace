import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GoogleLogo from 'icons/GoogleLogo';

const styles = theme => ({
  leftGutter: {
    marginLeft: theme.spacing.unit * 2,
  },
  googleButton: {
    justifyContent: 'start',
  },
  uncapitalized: {
    textTransform: 'none',
  },
});

const GoogleButton = ({
  classes,
  ...props
}) => {
  return (
    <Button
      fullWidth
      className={classes.googleButton}
      classes={{ label: classes.uncapitalized }}
      variant="outlined"
      {...props}>
      <GoogleLogo />
      <span className={classes.leftGutter}>Continue with Google</span>
    </Button>
  );
}

export default withStyles(styles)(GoogleButton);
