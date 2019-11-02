import React from 'react';
import { Field } from 'redux-form';
import { Motion, spring } from 'react-motion';
import { useTranslation } from '@dinify/common/src/lib/i18n';
import MuiButton from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/VisibilityRounded';
import VisibilityOff from '@material-ui/icons/VisibilityOffRounded';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ToggleIcon from 'material-ui-toggle-icon';
import Text from '../Inputs/Text';

const animConfig = { stiffness: 480, damping: 48 };

export const SignupForm = ({
  classes,
  style,
  direction,
  page,
  errors,
  formOpen,
  setPage,
  showPassword,
  setShowPassword
}: any) => {

  const { t } = useTranslation();

  let emailLabel = t('email.long');

  if (page === 'default') {
    emailLabel = t('auth.continueWithEmail');
  }

  const Button = ({ children, ...otherProps }: any) => 
    <MuiButton classes={{root: classes.button2}} {...otherProps}>
      {children}
    </MuiButton>;

  let socialSection;

  return (
    <div className={classes && classes.background} style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      transform: `translate3d(0, ${style.x * 129 * direction}px, 0)`
    }}>
      <div className={classes && classes.background} style={{
        position: 'relative',
        zIndex: 70,
        transform: `translate3d(0, ${style.x * 129 * (direction === -1 ? 1 : 0)}px, 0)`
      }}>
        <Field
          name="email"
          component={Text}
          componentProps={{
            label: emailLabel,
            error: errors.email,
            type: 'email',
            fullWidth: true,
            variant: 'filled',
            name: 'email',
            autocapitalization: 'none',
            autoComplete: 'email',
          }}
        />
      </div>
      {['default', 'signUp'].includes(page) && <div style={{
        position: 'relative',
        display: 'flex',
        marginTop: 8,
        zIndex: 60,
      }}>
        <Field
          name="firstName"
          component={Text}
          componentProps={{
            label: t('auth.firstName'),
            disabled: !formOpen,
            type: 'text',
            variant: 'filled',
            name: 'fname',
            autoFocus: true,
            autoComplete: 'given-name',
            autocapitalization: 'words',
            style: {marginRight: 4, flex: 1}
          }}
        />
        <Field
          name="lastName"
          component={Text}
          componentProps={{
            label: t('auth.lastName'),
            disabled: !formOpen,
            type: 'text',
            variant: 'filled',
            name: 'lname',
            autoComplete: 'family-name',
            autocapitalization: 'words',
            style: {marginLeft: 4, flex: 1}
          }}
        />
      </div>}
      <Motion
        defaultStyle={{x: 1}}
        style={{x: spring(page === 'forgotPassword' ? 0 : 1, animConfig)}}>
        {style =>
          <div style={{position: 'relative', zIndex: 60}}>
          <div ref={node => {socialSection = node}} style={{
            willChange: 'transform',
            overflow: 'hidden',
            opacity: style.x**(1/3),
            transformOrigin: 'top center',
            transform: `scale(1, ${style.x}) translate3d(0, 0, 0)`
          }}>
            <div ref={node => {socialSection = node}} style={{
              transformOrigin: 'top center',
              transform: `scale(1, ${1 / style.x}) translate3d(0, 0, 0)`
            }}>
              <Field
                name="password"
                component={Text}
                meta={{error: errors.password}}
                componentProps={{
                  label: t('auth.password'),
                  style: {marginTop: 8},
                  disabled: !formOpen,
                  type: showPassword ? 'text' : 'password',
                  fullWidth: true,
                  variant: 'filled',
                  name: 'password',
                  autoComplete: page === 'signUp' ? 'new-password' : 'current-password',
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disabled={!formOpen}
                          aria-label="Toggle password visibility"
                          onClick={() => {setShowPassword(!showPassword)}}>
                          <ToggleIcon
                            on={!showPassword}
                            onIcon={<Visibility />}
                            offIcon={<VisibilityOff />}/>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }}
              />
            </div>
          </div>
        </div>
        }
      </Motion>
      {['forgotPassword', 'signIn'].includes(page) &&
        <Button
          variant="outlined"
          className={`${classes.uncapitalized} ${classes.transitionOpacity}`}
          onClick={() => setPage('forgotPassword')}
          style={{
            position: 'relative',
            zIndex: 60,
            marginTop: 8,
            opacity: page === 'forgotPassword' ? 0 : 1
          }}>
          Forgot password
        </Button>
      }
    </div>
  );
}