// @flow
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components'
import { appIsRunning } from '../../selectors/restaurant'
import media from '../../common/helpers/media'
import Board from './Board'
import SelectWB from './SelectWB'
import SignIn from '@dinify/common/dist/components/SignIn';
import withRoot from 'withRoot.js';


const Content = styled.div`
  font-family: 'Montserrat', sans-serif;
  ${media.tablet`max-width: 100%;`}
`

const AppLoader = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
`

const SignInWithRoot = withRoot(SignIn);

const App = ({ appLoading, user, history }) =>
  (<Router>
    <Content>
      {appLoading && <AppLoader>Waiterboard is loading...</AppLoader>}
      {!appLoading &&
          <Switch>
          <Route path="/signin" component={() => {
            return user.isEmpty ? <SignInWithRoot user={user}/> :
            <Redirect to="/board"/>
          }} />
          <Route exact path="/board" component={() => {
            return (!user.isEmpty || !user.isLoaded) ? <SelectWB history={history} /> :
            <Redirect to="/signin"/>
          }} />
          <Route path="/board/:id" component={() => {
            return (!user.isEmpty || !user.isLoaded) ? <Board history={history} /> :
            <Redirect to="/signin"/>
          }} />
          <Route exact path="/" component={() => <Redirect to="/board" />} />
        </Switch>
      }
    </Content>
  </Router>);

export default connect(state => ({
  user: state.firebase.auth,
  appLoading: !appIsRunning(state)
}))(App)
