// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import { reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { Motion, spring } from 'react-motion';

import LogoText from '../../icons/LogoText';

import ChevronRight from '@material-ui/icons/ChevronRightRounded';
import ChevronLeft from '@material-ui/icons/ChevronLeftRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AccountExistsDialog from '../dialogs/AccountExistsDialog';
import ResponsiveContainer from '../ResponsiveContainer';

import { setPage } from '../../ducks/auth/actions';
import { openDialog as openDialogAction } from '../../ducks/ui/actions';

import Fields from './Fields';

const styles = theme => ({
  uncapitalized: {
    textTransform: 'none',
  },
  colorTextSecondary: {
    color: theme.palette.text.secondary
  },
});

export class SignInForm extends React.Component {

  validateEmail = (email) => {
    const errors = {};
    if (!email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }
    // TODO correct regexp
    // if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
  }

  signIn = ({ email, password }) => {
    this.validateEmail(email);
    const errors = {};
    if (!password) errors.password = 'Required';
    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
    const { firebase } = this.props;
    firebase.login({ email, password });
  }

  signUp = ({ email, password, firstName, lastName }) => {
    this.validateEmail(email);
    const errors = {};
    if (!password) errors.password = 'Required';
    if (!firstName) errors.firstName = 'Required';
    if (!lastName) errors.lastName = 'Required';
    if (Object.keys(errors).length !== 0) throw new SubmissionError(errors);
    const { firebase } = this.props;
    firebase.createUser(
      { email, password },
      {
        displayName: `${firstName} ${lastName}`,
        email
      }
    )
  }

  decide = ({ email }) => {
    this.validateEmail(email);
    const { firebase, openDialog, setPage } = this.props;
    const auth = firebase.auth();
    return auth.fetchSignInMethodsForEmail(email).then(methods => {
      if (methods.length === 0) {
        setPage('signUp');
      }
      else if (methods.includes('password')) {
        setPage('signIn');
      }
      // present user with dialog with options
      else {
        openDialog({
          id: 'account-exists',
          component: (props) => <AccountExistsDialog
            providerName="password"
            email={email}
            methods={methods}
            {...props}/>
        });
      }
    });
  }

  forgotPassword = ({ email }) => {
    const { firebase } = this.props;
    return firebase.auth().sendPasswordResetEmail(email);
  }

  render() {
    const {
      classes,
      handleSubmit = () => {},
      pristine,
      submitting,
      page,
      setPage
    } = this.props;

    const animConfig = { stiffness: 480, damping: 48 };

    const formOpen = page !== 'default';

    let submitButtonText = 'Next';
    let submitFc = this.decide;
    let formTitle = 'Sign in';
    let formSubtitle = 'to access more features, like dining history, reviews and saving your favorites';
    let leftButtonAction = () => setPage(formOpen ? 'default' : 'signUp');

    if (page === 'signIn') {
      submitButtonText = 'Sign in';
      formTitle = 'Sign in with password'
      submitFc = this.signIn;
    }
    if (page === 'signUp') {
      submitButtonText = 'Create account';
      formTitle = 'Create account';
      submitFc = this.signUp;
    }
    if (page === 'forgotPassword') {
      submitButtonText = 'Send email';
      formTitle = 'Forgot password';
      submitFc = this.forgotPassword;
      leftButtonAction = () => setPage('signIn');
      formSubtitle = 'enter the email address you use to sign in to get a password reset email'
    }

    return (
      <form
        onSubmit={handleSubmit(submitFc)}
        style={{height: 'calc(100vh - 112px)'}}
      >
        <ResponsiveContainer style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            marginLeft: 32,
            marginRight: 32,
            maxWidth: 512
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: 16
            }}>
              <Link to="/" style={{height: 40}}>
                <div style={{
                  height: 40,
                  backgroundColor: "#c13939",
                  color: "rgba(255, 255, 255, 1)",
                  fill: "rgba(255, 255, 255, 1)",
                  borderRadius: 20,
                  padding: '8px 16px'
                }}>
                  <LogoText color="inherit"/>
                </div>
              </Link>
              <Typography style={{marginTop: 16, marginBottom: 8}} variant="h6">
                {formTitle}
              </Typography>
              <Typography align="center" variant="caption">
                {formSubtitle}
              </Typography>
            </div>
            <div style={{height: 185, overflow: 'hidden'}}>
              <Fields />
            </div>

            <div style={{
              display: 'flex',
              marginTop: 16
            }}>
              <Button onClick={leftButtonAction} variant="text" className={classes && classes.uncapitalized}>
                {formOpen && <ChevronLeft style={{fontSize: '1.3125rem', marginLeft: -12}} />}
                {formOpen ? 'Back' : 'New account'}
              </Button>
              <div style={{flex: 1}}/>
              <Button
                type="submit"
                disabled={pristine || submitting}
                variant="outlined"
                color="primary"
                className={classes && classes.uncapitalized}>
                <Motion
                  defaultStyle={{x: 1}}
                  style={{x: spring(submitting ? 0 : 1, animConfig)}}>
                  {style =>
                    <div style={{ display: 'flex', opacity: style.x }}>
                      {submitButtonText}
                      {page === 'default' && <ChevronRight style={{fontSize: '1.3125rem', marginRight: -12}} />}
                    </div>
                  }
                </Motion>
                {submitting && <CircularProgress className={classes && classes.colorTextSecondary} style={{
                    position: 'absolute'
                }} size={16} thickness={6}/>}
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
      </form>
    );
  }
}

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'auth/signin',
  }),
  firebaseConnect(),
  connect(
    state => ({
      page: state.auth.page,
    }),
    {
      setPage,
      openDialog: openDialogAction
    }
  )
)(SignInForm)
