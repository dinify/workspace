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
import { stat } from 'fs';


const Content = styled.div`
  font-family: 'Lato', sans-serif;
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

const App = ({ appLoading, user, history, selectedRestaurant, selectedWaiterboard }) =>
  (<Router>
    <Content>
      {appLoading || !user.isLoaded ? <AppLoader>Waiterboard is loading...</AppLoader> :
        <Switch>
          <Route path="/signin" component={() => {
            return user.isEmpty ? <SignInWithRoot user={user}/> : <Redirect to="/select"/>;
          }} />
          <Route path="/select" component={() => {
            if (user.isEmpty) return <Redirect to="/signin"/>;
            return <SelectWB history={history} />;
          }} />
          <Route path="/board" component={() => {
            if (user.isEmpty) return <Redirect to="/signin"/>;
            if (!selectedRestaurant || !selectedWaiterboard) return <Redirect to="/select" />;
            return <Board history={history} />;
          }} />
          <Route path="/" component={() => {
            if (user.isEmpty) return <Redirect to="/signin" />;
            if (!selectedRestaurant || !selectedWaiterboard) return <Redirect to="/select" />; 
            return <Redirect to="/board" />; 
          }} />
        </Switch>
      }
    </Content>
  </Router>);

export default connect(state => ({
  user: state.firebase.auth,
  appLoading: !appIsRunning(state),
  selectedRestaurant: state.restaurant.selectedRestaurant,
  selectedWaiterboard: state.restaurant.selectedWBId
}))(App)
