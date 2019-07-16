import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { appIsRunning } from 'selectors/restaurant';
import { withStyles } from '@material-ui/core/styles';

import SignIn from '@dinify/common/dist/components/SignIn';
import Dashboard from 'web/pages/Dashboard';
import Qr from 'web/pages/Qr';
import RegisterRestaurant from 'web/pages/RegisterRestaurant';
import { reportCampaignAction } from '@dinify/common/dist/ducks/reporting/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import withRoot from 'withRoot.js';
import QRsPrint from './pages/QRsPrint';

const SignInWithRoot = withRoot(SignIn);
const RegisterRestaurantWithRoot = withRoot(RegisterRestaurant);

const styles = () => ({
  content: {
    backgroundColor: 'rgb(27, 36, 49)',
    color: 'white'
  },
  progress: {
    color: 'rgba(255,255,255,0.4)'
  },
  appLoaderContainer: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
});

const App = ({
  appLoading,
  user,
  history,
  ongoingRegistration,
  selectedRestaurant,
  reportCampaignAction,
  classes
}) => {
  if (ongoingRegistration && !window.location.pathname.includes('/register') && !user.isEmpty) {
    window.location.replace('/register');
  }
  const parsed = queryString.parse(history.location.search);
  const token = parsed.t;
  if (token) reportCampaignAction({ token, status: 'landed:dashboard'});
  return (
    <div className={classes.content}>
      {appLoading || !user.isLoaded ?
        <div className={classes.appLoaderContainer}>
          <CircularProgress className={classes.progress} />
        </div>
        :
        <Switch>
          <Route path="/qr/:code" component={Qr} />
          <Route path="/qrsprint" component={QRsPrint} />
          <Route path="/signin" component={({location}) => {
            return user.isEmpty ? <SignInWithRoot env="DASHBOARD" user={user} location={location} /> :
            <Redirect to="/"/>
          }} />
          <Route path="/register" component={({location}) => {
            if (user.isEmpty) return <Redirect to="/signin"/>;
            // if (selectedRestaurant) return <Redirect to="/"/>;
            return <RegisterRestaurantWithRoot location={location} user={user}/>;
          }} />
          <Route path="/" component={({location}) => {
            if (user.isEmpty) return <Redirect to="/signin" />;
            if (!selectedRestaurant) return <Redirect to="/register" />;
            return <Dashboard history={history} location={location} />;
          }} />
        </Switch>
      }
    </div>
  );
}

export default withStyles(styles)(connect(state => ({
  ongoingRegistration: state.restaurant.ongoingRegistration,
  user: state.firebase.auth,
  selectedRestaurant: state.restaurant.selectedRestaurant,
  appLoading: !appIsRunning(state),
}), {
  reportCampaignAction
})(App));
