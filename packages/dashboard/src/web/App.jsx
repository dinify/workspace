// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { appIsRunning } from 'selectors/restaurant';

import SignIn from '@dinify/common/dist/components/SignIn';
import Dashboard from 'web/pages/Dashboard';
import Qr from 'web/pages/Qr';
import RegisterRestaurant from 'web/pages/RegisterRestaurant';
import { reportCampaignAction } from '@dinify/common/dist/ducks/reporting/actions';
import withRoot from 'withRoot.js';

const Content = styled.div`
  background-color: rgb(27, 36, 49);
  color: white;
`;

const AppLoader = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SignInWithRoot = withRoot(SignIn);
const RegisterRestaurantWithRoot = withRoot(RegisterRestaurant);

const App = ({
  appLoading,
  user,
  history,
  ongoingRegistration,
  selectedRestaurant,
  reportCampaignAction
}) => {
  if (ongoingRegistration && !window.location.pathname.includes('/register') && !user.isEmpty) {
    window.location.replace('/register');
  }
  const parsed = queryString.parse(history.location.search);
  const token = parsed.token;
  if (token) reportCampaignAction({ token, status: 'landed:dashboard'});
  return (
    <Content>
      {appLoading || !user.isLoaded ? <AppLoader>Dashboard is loading...</AppLoader> :
        <Switch>
          <Route path="/qr/:code" component={Qr} />
          <Route path="/signin" component={() => {
            return user.isEmpty ? <SignInWithRoot env="DASHBOARD" user={user}/> :
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
    </Content>
  );
}

export default connect(state => ({
  ongoingRegistration: state.restaurant.ongoingRegistration,
  user: state.firebase.auth,
  selectedRestaurant: state.restaurant.selectedRestaurant,
  appLoading: !appIsRunning(state),
}), {
  reportCampaignAction
})(App);
