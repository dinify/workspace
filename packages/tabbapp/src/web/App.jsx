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
});

type CommonWrapperProps = {
  children?: React.Node,
  classes: object,
}

let CommonWrapper = ({
  children,
  classes,
}: CommonWrapperProps) => {
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}
CommonWrapper = withRoot(withStyles(styles)(CommonWrapper))

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
