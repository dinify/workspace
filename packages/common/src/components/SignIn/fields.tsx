import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/styles';
import { Motion, spring } from 'react-motion';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import GoogleButton from '../GoogleButton';
import FacebookButton from '../FacebookButton';
import { setPage, setShowPassword } from '../../features/auth/actions';
import { openDialog as openDialogAction } from '../../features/ui/actions';
import { getPlatform } from '../../lib/FN';
import { SignupForm } from './signup-form';
import { Separator } from './separator';

const styles = (theme: any) => ({
  grow: {
    flex: 1,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  uncapitalized: {
    textTransform: 'none',
  },
  transitionOpacity: {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  },
  background: {
    backgroundColor: theme.palette.background.default
  },
  button2: {
    ...theme.typography.button2
  }
});

const UP = 1;
const DOWN = -1;

const Fields = ({
  classes,
  page,
  showPassword,
  setPage,
  setShowPassword,
  env,
  authError,
  firebase
}: any) => {

  const [errors, setErrors] = useState({});
  const { t } = useTranslation();


  useEffect(() => {
    let errors: any = {};
    if (!authError) return;
    switch (authError.code) {
      case 'auth/invalid-email':
        errors.email = t('auth.invalid-email');
        break;
      case 'auth/email-already-in-use':
        errors.email = t('auth.email-already-in-use');
        break;
      case 'auth/weak-password':
        errors.password = t('auth.weak-password');
        break;
      case 'auth/user-disabled':
        errors.email = t('auth.user-disabled');
        break;
      case 'auth/user-not-found':
        errors.email = t('auth.user-not-found');
        break;
      case 'auth/wrong-password':
        errors.password = t('auth.wrong-password');
        break;
      default:
        break;
    }
    // Clear form errors on page change
    // if (nextProps.page !== page) errors = {};
    setErrors({ errors });
  });


  const animConfig = { stiffness: 480, damping: 48 };

  const formOpen = page !== 'default';

  const direction = env === 'DASHBOARD' ? DOWN : UP;

  const mobile = getPlatform() !== 'desktop';
  const singupFormProps = {
    classes,
    direction,
    page,
    errors,
    formOpen,
    setPage,
    showPassword,
    setShowPassword
  };
  return (
    <Motion
      defaultStyle={{ x: 1 }}
      style={{ x: spring(formOpen ? 0 : 1, animConfig) }}>
      {style => {
        return (
          <div style={{
            position: 'relative'
          }}>
            {direction === DOWN && <SignupForm {...singupFormProps} style={style} />}
            <div style={{
              position: 'absolute',
              zIndex: 40,
              top: direction === DOWN ? 72 : 0,
              left: 0,
              right: 0,
              opacity: style.x,
            }}>
              {direction === DOWN && <Separator classes={classes} />}
              <div style={{ paddingBottom: 16 }}>
                <GoogleButton onClick={() => firebase.login({ provider: 'google', type: mobile ? 'redirect' : 'popup' })} />
              </div>
              <div style={{ paddingBottom: 16 }}>
                <FacebookButton onClick={() => firebase.login({ provider: 'facebook', type: mobile ? 'redirect' : 'popup' })} />
              </div>
              {direction === UP && <Separator classes={classes} />}
            </div>
            {direction === UP && <SignupForm {...singupFormProps} style={style} />}
          </div>
        );
      }}
    </Motion>
  );
}


export default compose(
  withStyles(styles),
  connect(
    (state: any) => ({
      authError: state.firebase.authError,
      page: state.auth.page,
      showPassword: state.auth.showPassword
    }),
    {
      setPage,
      setShowPassword,
      openDialog: openDialogAction
    }
  )
)(Fields);
