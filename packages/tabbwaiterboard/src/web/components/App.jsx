// @flow

import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import { appIsRunning } from '../../selectors/restaurant'
import media from '../../common/helpers/media'
import Board from './Board'
import SelectWB from './SelectWB'
import Login from './Login'

const Content = styled.div`
  font-family: 'Montserrat', sans-serif;
  ${media.tablet`max-width: 100%;`}
`;

const AppLoader = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
`;

type AppProps = {
  appLoading: boolean,
};

const App = ({ appLoading }: AppProps) =>
  (<Router>
    <Content>
      {appLoading && <AppLoader>Waiterboard is loading...</AppLoader>}
      {!appLoading &&
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/board" exact component={SelectWB} />
          <Route path="/board/:id" exact component={Board} />
        </div>}
    </Content>
  </Router>);

export default connect(state => ({
  appLoading: !appIsRunning(state),
}))(App);
