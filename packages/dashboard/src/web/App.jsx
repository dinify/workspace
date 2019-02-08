// @flow
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { appIsRunning } from 'selectors/restaurant';

import SignIn from '@dinify/common/dist/components/SignIn';

import Dashboard from 'web/pages/Dashboard';
import Qr from 'web/pages/Qr';

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

type AppProps = {
  appLoading: boolean,
};

const SignInWithRoot = withRoot(SignIn);

const App = ({ appLoading, user, history }: AppProps) => {
  return (
    <Router>
      <Content>
        {appLoading && <AppLoader>Dashboard is loading...</AppLoader>}
        {!appLoading && (
          <Switch>
            <Route path="/signin" component={() => {
              return user.isEmpty ? <SignInWithRoot user={user}/> :
              <Redirect to="/"/>
            }} />
            <Route path="/" component={() => {
              return (!user.isEmpty || !user.isLoaded) ? <Dashboard history={history} /> :
              <Redirect to="/signin"/>
            }} />

            <Route path="/qr/:code" component={Qr} />
          </Switch>
        )}
      </Content>
    </Router>
  );
}

export default connect(state => ({
  user: state.firebase.auth,
  appLoading: !appIsRunning(state),
}))(App);
