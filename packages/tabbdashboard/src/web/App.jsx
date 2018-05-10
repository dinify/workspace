// @flow
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { appIsRunning } from 'selectors/restaurant'

import Login from 'web/pages/Login'
import Signup from 'web/pages/Signup'
import Dashboard from 'web/pages/Dashboard'
import Qr from 'web/pages/Qr'

const Content = styled.div `
  background-color: rgb(27,36,49);
  color: white;
`

const AppLoader = styled.div `
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

type AppProps = {
  appLoading: boolean,
}

const App = ({
    appLoading
  }: AppProps) =>
  (<Router>
    <Content>
      {appLoading && <AppLoader>Dashboard is loading...</AppLoader>}
      {!appLoading &&
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/qr/:code" component={Qr} />
          <Route path="/" component={Dashboard} />
        </Switch>}
    </Content>
  </Router>)

export default connect(state => ({
  appLoading: !appIsRunning(state),
}))(App)
