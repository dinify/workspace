// @flow
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { appIsRunning } from '../../selectors/restaurant'
import media from '../../common/helpers/media'

import Login from './Login'
import Dashboard from './Dashboard'
import Admin from './Admin'
import Viewer from './Viewer'

const Content = styled.div`
  font-family: 'Montserrat', sans-serif;
  background-color: rgb(27,36,49);
  color: white;
  ${media.tablet`max-width: 100%;`}
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

const App = ({ appLoading }: AppProps) =>
  (<Router>
    <Content>
      {appLoading && <AppLoader>App is loading...</AppLoader>}
      {!appLoading &&
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/test" component={Viewer} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={Admin} />
        </Switch>}
    </Content>
  </Router>);

export default connect(state => ({
  appLoading: !appIsRunning(state),
}))(App);
