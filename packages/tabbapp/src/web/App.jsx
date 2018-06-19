// @flow
import React from 'react'
import { Router, Route } from 'react-router'

import Login from 'web/pages/Login'
import Checkin from 'web/pages/Checkin'
import RestaurantProfile from 'web/pages/RestaurantProfile'
import CategoryContent from 'web/pages/CategoryContent'
import FoodDetail from 'web/pages/FoodDetail'
import Cart from 'web/pages/Cart'
import Bill from 'web/pages/Bill'
import Receipt from 'web/pages/Receipt'
import Main from 'web/pages/Main'

import AppBar from 'web/components/AppBar';

import { withStyles } from '@material-ui/core/styles';
import withRoot from 'withRoot.js';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

const styles = theme => ({
  root: {},
  padded: {
    paddingTop: '64px',
    paddingLeft: theme.spacing.unit * 15,
    paddingRight: theme.spacing.unit * 15,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit * 8
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56px',
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }
  },
  paddedMap: {
    paddingTop: theme.spacing.unit * 9,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: '464px',
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing.unit * 3
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    }
  },
})

const App = ({
  history,
}) => (
  <div>
    <AppBar>

    </AppBar>
    <Router history={history}>
      <Route path="/login" component={Login} />
      <Route path="/checkin" component={Checkin} />

      <Route path="/restaurant/:subdomain" component={RestaurantProfile} />
      <Route path="/category/:id" component={CategoryContent} />
      <Route path="/food/:id" component={FoodDetail} />

      <Route path="/cart" component={Cart} />
      <Route path="/bill" component={Bill} />
      <Route path="/receipt" component={Receipt} />

      <Route path="/" component={Main} />
    </Router>
  </div>
)

export default withRoot(
  withStyles(styles)(withWidth()(App))
)
