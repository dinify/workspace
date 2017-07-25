// @flow

import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import { appIsRunning } from '../../selectors/viewer'
import media from '../../common/helpers/media'
import Viewer from './Viewer'
import Login from './Login'
import Settings from './Settings'
import Analytics from './Analytics'

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
        <div>
          <Route exact path="/" component={Viewer} />
          <Route path="/login" component={Login} />
          <Route path="/settings" component={Settings} />
          <Route path="/analytics" component={Analytics} />
        </div>}
    </Content>
  </Router>);

export default connect(state => ({
  appLoading: !appIsRunning(state),
}))(App);
