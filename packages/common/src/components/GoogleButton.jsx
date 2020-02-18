// @flow
import React from 'react';
import { withStyles, withTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import GoogleLogo from '../icons/GoogleLogo';
import { useTranslation } from '../lib/i18n';

const styles = theme => ({
  leftGutter: {
    marginLeft: theme.spacing(2),
  },
  googleButton: theme.palette.type === 'light' ? {
    ...theme.typography.button2,
    height: 40,
    justifyContent: 'start',
  } : {
      ...theme.typography.button2,
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
  const { t } = useTranslation();
  return (
    <Button
      fullWidth
      className={classes.googleButton}
      classes={{ label: classes.uncapitalized }}
      variant={theme.palette.type === 'light' ? 'outlined' : 'contained'}
      {...props}>
      <GoogleLogo />
      <span className={classes.leftGutter}>{t('auth.continueWithGoogle')}</span>
    </Button>
  );
}

export default withTheme(withStyles(styles)(GoogleButton));
