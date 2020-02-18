// @flow
import React from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import FacebookLogo from '../icons/FacebookLogo';
import { useTranslation } from '../lib/i18n';

const styles = theme => ({
  leftGutter: {
    marginLeft: theme.spacing(2),
  },
  facebookButton: {
    ...theme.typography.button2,
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
  const { t } = useTranslation();
  return (
    <Button
      fullWidth
      className={classes.facebookButton}
      classes={{ label: classes.uncapitalized }}
      variant="contained"
      {...props}>
      <FacebookLogo />
      <span className={classes.leftGutter}>{t('auth.continueWithFacebook')}</span>
    </Button>
  );
}

export default withStyles(styles)(FacebookButton);
