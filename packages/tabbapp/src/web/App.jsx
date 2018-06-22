// @flow
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';

import Login from 'web/pages/Login';
import Checkin from 'web/pages/Checkin';
import RestaurantView from 'web/pages/RestaurantView';
import CategoryView from 'web/pages/CategoryView';
import FoodView from 'web/pages/FoodView';
import Cart from 'web/pages/Cart';
import Bill from 'web/pages/Bill';
import Receipt from 'web/pages/Receipt';
import Main from 'web/pages/Main';

import AppBar from 'web/components/AppBar';
import ResponsiveContainer from 'web/components/ResponsiveContainer';

import { withStyles } from '@material-ui/core/styles';
import withRoot from 'withRoot.js';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

import { logoutInit } from 'ducks/auth/actions';
import { getLoggedUser } from 'ducks/user/selectors';

const styles = theme => ({
  root: {},
  padded: {
    paddingTop: '64px',
    paddingLeft: theme.spacing.unit * 15,
    paddingRight: theme.spacing.unit * 15,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 8,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56px',
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  paddedMap: {
    paddingTop: theme.spacing.unit * 9,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: '464px',
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing.unit * 3,
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
});

type CommonWrapperProps = {
  children?: React.Node,
  classes: object,
}

let CommonWrapper = ({
  children,
  classes,
  loggedUser,
  logout,
}: CommonWrapperProps) => {
  return (
    <div className={classes.root}>
      <AppBar user={loggedUser} logout={logout} />
      <ResponsiveContainer narrow={false}>
        {children}
      </ResponsiveContainer>
    </div>
  )
}
CommonWrapper = connect(
  state => ({
    loggedUser: getLoggedUser(state)
  }), {
    logout: logoutInit
  }
)(CommonWrapper)
CommonWrapper = withRoot(withStyles(styles)(withWidth()(CommonWrapper)))

const App = ({ history }) => (
  <div>

    <Router history={history}>
      <Route path="/" component={CommonWrapper}>
        <IndexRoute component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/checkin" component={Checkin} />

      <Route path="/restaurant/:id" component={RestaurantView} />
      <Route path="/category/:id" component={FoodView} />
      <Route path="/food/:id" component={FoodView} />

        <Route path="/cart" component={Cart} />
        <Route path="/bill" component={Bill} />
        <Route path="/receipt" component={Receipt} />
      </Route>


    </Router>
  </div>
);

export default App;
